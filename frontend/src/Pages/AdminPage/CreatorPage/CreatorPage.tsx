import { getAllTasks } from 'Api/TaskService'
import { getAllTestsApi } from 'Api/TestService'
import { taskItem } from 'Models/Task'
import { Test } from 'Models/Test'
import CreateTaskModal from 'Modules/AdminPage/CreateTestModal'
import TaskList from 'Modules/AdminPage/TaskList/TaskList'
import TestList from 'Modules/AdminPage/TestList/TestList'
import React, { useEffect, useState } from 'react'

const CreatorPage: React.FC = () => {
  const [tasks, setTasks] = useState<taskItem[] | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const tasksData = await getAllTasks()
      const testsData = await getAllTestsApi()

      if (tasksData) setTasks(tasksData)
      if (testsData) setTests(testsData)
    }

    getData()
  }, [])

  const handleCreateTest = async () => {
    const testsData = await getAllTestsApi()
    if (testsData) setTests(testsData)
  }

  if (!tasks) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br rounded-2xl from-blue-50 via-slate-100 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* --- TEST PANEL --- */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Tests</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Create Test
            </button>
          </header>
          <TestList data={tests} />
        </section>

        {/* --- TASK PANEL --- */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Tasks</h1>
          <TaskList data={tasks} />
        </section>
      </div>

      {showModal && (
        <CreateTaskModal
          tasks={tasks}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateTest}
        />
      )}
    </div>
  )
}

export default CreatorPage
