import { getAllTasks } from 'Api/TaskService'
import { getAllTests } from 'Api/TestService';
import { taskItem } from 'Models/Task';
import { Test } from 'Models/Test';
import CreateTaskModal from 'Modules/AdminPage/CreateTaskModal';
import TaskList from 'Modules/TaskList/TaskList';
import TestList from 'Modules/TestList/TestList';
import React, { useEffect, useState } from 'react'

type Props = {}

const CreatorPage = (props: Props) => {
    const[tasks,setTasks] = useState<taskItem[]>([]);
    const[tests,setTests] = useState<Test[]>([]);
    const[showModal,setShowModal]=useState<boolean>(false);
    useEffect(()=>{
        const getData = async()=>{
            const tasksData = await getAllTasks()
            const testsData = await getAllTests()
            if(tasksData) setTasks(tasksData)
            if(testsData) setTests(testsData)
        }
    getData()
    },[])
    
    const handleCreateTest = async () => {
  const testsData = await getAllTests();
  if (testsData) setTests(testsData);
};


  return (
    <div className="flex justify-around mt-5 w-100">

        <div>
            <h1 className="font-bold">Tests:</h1>
            <TestList data={tests}/>
            <button className='bg-blue-700 p-2 m-2' onClick={()=>setShowModal(true)}>Create test</button>
        </div>

        <div>
            <h1 className="font-bold">Tasks:</h1>
            <TaskList data={tasks}/>
        </div>

        {showModal&&(
            <CreateTaskModal tasks={tasks} onClose={()=>(setShowModal(false))}
            onCreate={handleCreateTest}/>
        )}
    </div>
  )
}

export default CreatorPage