import { getAllTasks } from 'Api/TaskService'
import { getAllTestsApi } from 'Api/TestService';
import { taskItem } from 'Models/Task';
import { Test } from 'Models/Test';
import CreateTaskModal from 'Modules/AdminPage/CreateTestModal';
import TaskList from 'Modules/AdminPage/TaskList/TaskList';
import TestList from 'Modules/AdminPage/TestList/TestList';
import React, { useEffect, useState } from 'react'

const CreatorPage = () => {
  const [tasks, setTasks] = useState<taskItem[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const tasksData = await getAllTasks();
      const testsData = await getAllTestsApi();

      if (tasksData) setTasks(tasksData);
      if (testsData) setTests(testsData);
    };
    getData();
  }, []);

  const handleCreateTest = async () => {
    const testsData = await getAllTestsApi();
    if (testsData) setTests(testsData);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-slate-100 to-white">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* --- TEST PANEL --- */}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">Tests</h1>
            <button
              className="
                bg-blue-600 
                text-white 
                px-4 py-2 
                rounded-lg 
                shadow-md 
                hover:bg-blue-700 
                transition
              "
              onClick={() => setShowModal(true)}
            >
              Create test
            </button>
          </header>

          <TestList data={tests} />
        </div>

        {/* --- TASK PANEL --- */}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Tasks</h1>
          <TaskList data={tasks} />
        </div>

      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <CreateTaskModal
          tasks={tasks}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateTest}
        />
      )}
    </div>
  );
};

export default CreatorPage;
