import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CompileCode } from 'Api/CompileService'
import { CompilationResult } from 'Models/Compilation'
import { addSolutionForTask, getTasksForTestSolution } from 'Api/TaskService'
import { taskItemForSolving } from 'Models/Task'

import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'

import { finishTestApi } from 'Api/TestService'

const languageExtensions: Record<string, any[]> = {
  java: [java()],
  cpp: [cpp()],
  python: [python()],
}

const defaultTemplates: Record<string, string> = {
  java: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
  python: `def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`,
  cpp: `#include <iostream>

int main() {
    // Your code here
    return 0;
}`,
}

// Mapowanie języka na nazwę pliku
const languageToFileName: Record<string, string> = {
  java: "Main.java",
  python: "main.py",
  cpp: "main.cpp",
}

type Props = {}

const SolveTestPage = (props: Props) => {
  const { appId, testId } = useParams<{ appId: string; testId: string }>()
  const [tasksList, setTasksList] = useState<taskItemForSolving[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Domyślny język i kod (fallback Java)
  const [language, setLanguage] = useState('java')
  const [userCode, setUserCode] = useState<string>(defaultTemplates['java'])

  const [submitting, setSubmitting] = useState(false)
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null)

  const [compiling, setCompiling] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
  const getTasks = async () => {
    try {
      setLoading(true)

      const tasksData = await getTasksForTestSolution(Number(appId))

      if (tasksData) {
        const unsolvedTasks = tasksData.filter(task => !task.isSolved)
        setTasksList(unsolvedTasks)
      } else {
        setTasksList([])
      }
    } catch (err) {
      console.error('GetTasksList error', err)
      toast.error('Failed to load tasks.')
      setTasksList([])
    } finally {
      setLoading(false)
    }
  }

  getTasks()
}, [appId])


  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value
    setLanguage(lang)
    setUserCode(defaultTemplates[lang] || '')
    setCompilationResult(null)
  }

  const addSolution = async () => {
    if (submitting) return false
    setSubmitting(true)
    try {
      if (tasksList) {
        await addSolutionForTask(Number(appId), tasksList[currentIndex]?.id, userCode,language)
        return true
      }
    } catch (err) {
      console.log('Send solution error: ', err)
      toast.error('Something went wrong!')
    } finally {
      setSubmitting(false)
    }
  }

  const compileCode = async () => {
    if (compiling) return
    setCompiling(true);
    try {
      if (userCode) {
        const compileResponse = await CompileCode(language, userCode)
        if (compileResponse) setCompilationResult(compileResponse)
      }
    } catch (err) {
      toast.warning('Something went wrong during compilation')
    }finally{
      setCompiling(false);
    }
  }

  const handleNextTask = async () => {
    const success = await addSolution()
    if (!success) return
    if (tasksList && currentIndex < tasksList.length - 1) {
      toast.success('Solution added')
      setCurrentIndex((prev) => prev + 1)
      setUserCode(defaultTemplates[language] || '')
      setCompilationResult(null)
    } else {
      await finishTestApi(Number(appId))
      toast.info('Test completed')
      navigate('/')
    }
  }

  if (loading)
    return (
      <div className="flex items-start h-64 m-5 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  if (!tasksList || tasksList.length === 0)
    return (
      <div className="p-5 text-gray-500 text-center">
        No tasks available for this test.
      </div>
    )

  const currentTask = tasksList[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Solve Test
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Task {currentIndex + 1} / {tasksList.length}
          <span>Language:</span>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded-md p-1"
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </h2>

        <div className="border border-gray-200 p-6 rounded-md bg-gray-50 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {currentTask.description}
          </h3>

          {currentTask.expectedOutput && (
            <div className="mb-4">
              <strong className="text-gray-700">Expected output:</strong>
              <pre className="bg-gray-200 p-3 rounded mt-2 whitespace-pre-wrap text-gray-800 font-mono">
                {currentTask.expectedOutput}
              </pre>
            </div>
          )}
        </div>

         <button
        onClick={compileCode}
        disabled={compiling}
        className={`bg-green-500 text-white px-5 py-2 rounded-md transition duration-300 mb-4 ${
          compiling ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
        }`}
      >
        {compiling ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          'Compile'
        )}
      </button>

        <CodeMirror
          value={userCode}
          height="300px"
          extensions={languageExtensions[language]}
          onChange={(value) => setUserCode(value)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            foldGutter: true,
            indentOnInput: true,
            tabSize: 4,
          }}
          className="border border-gray-300 rounded-md font-mono"
        />

        <div className="flex justify-end mt-6">
          <button
            disabled={submitting}
            onClick={handleNextTask}
            className={`px-6 py-3 rounded-md text-white font-semibold transition duration-300 ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {submitting
              ? 'Saving...'
              : currentIndex < tasksList.length - 1
              ? 'Next Task'
              : 'Finish Test'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Console Output
        </h2>
        <pre className="bg-gray-900 text-green-400 font-mono p-6 rounded-lg max-h-64 overflow-auto whitespace-pre-wrap shadow-lg">
          {compilationResult?.success==true&& (
            <div className="mb-2">✅ {compilationResult.success}</div>
          )}
          {compilationResult?.success==true&&compilationResult?.output && (
            <div className="mb-2">{compilationResult.output}</div>
          )}
          {compilationResult?.success==false&&compilationResult?.output && (
            <div className="text-red-500 font-semibold">❌ {compilationResult.output}</div>
          )}
          {!compilationResult && (
            <div className="text-gray-500 italic">No output yet.</div>
          )}
        </pre>
      </div>
    </div>
  )
}

export default SolveTestPage
