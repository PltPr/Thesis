import { TaskWithSolution } from "Models/Task";
import { useState, useEffect } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';

const languageExtensions: Record<string, any> = {
  java: java(),
  cpp: cpp(),
  python: python(),
};

function detectLanguage(code: string): 'java' | 'python' | 'cpp' {
  const lower = code.toLowerCase();
  if (lower.includes('#include') || lower.includes('int main(')) {
    return 'cpp';
  } else if (lower.includes('def ') || lower.includes('if __name__ == "__main__"')) {
    return 'python';
  } else if (lower.includes('public class') || lower.includes('public static void main')) {
    return 'java';
  }
  return 'java'; // default
}

const TaskNavigator = ({
  solutions,
  onTaskChange
}: {
  solutions: TaskWithSolution[];
  onTaskChange: (taskId: number, index: number) => void;
}) => {
  const [index, setIndex] = useState(0);
  const task = solutions[index];

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const next = () => setIndex((i) => (i < solutions.length - 1 ? i + 1 : i));

  useEffect(() => {
    onTaskChange(task.codeSubmissionId, index);
  }, [index]);

  const code = task.code || "// No code submitted";
  const lang = detectLanguage(code);
  const extensions = languageExtensions[lang] || [];

  return (
    <div className="flex flex-col flex-1 border rounded-lg shadow-lg bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            index === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Previous
        </button>
        <span className="font-semibold text-gray-900">
          Task {index + 1} / {solutions.length}
        </span>
        <button
          onClick={next}
          disabled={index === solutions.length - 1}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            index === solutions.length - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next →
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        <p>
          <strong>Description:</strong> {task.taskDescription}
        </p>
        <p>
          <strong>Expected Output:</strong> {task.taskExpectedOutput}
        </p>
        <p>
          <strong>Compilation Result:</strong> {task.compilationResult}
        </p>
        <p>
          <strong>Execution Result:</strong> {task.executionResult}
        </p>
        <p>
          <strong>Submission Date:</strong>{" "}
          {new Date(task.submissionDate).toLocaleString("pl-PL")}
        </p>

        <div className="mt-4">
          <strong>Code:</strong>
          <CodeMirror
            value={code}
            extensions={extensions}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              foldGutter: true,
              indentOnInput: true,
              tabSize: 4,
            }}
            className="mt-2 rounded-lg shadow-lg border border-gray-300"
            height="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskNavigator;
