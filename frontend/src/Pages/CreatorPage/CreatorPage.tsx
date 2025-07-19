import { getAllTasks } from 'Api/TaskService'
import { getAllTests } from 'Api/TestService';
import { taskItem } from 'Models/Task';
import { Test } from 'Models/Test';
import TaskList from 'Modules/TaskList/TaskList';
import TestList from 'Modules/TestList/TestList';
import React, { useEffect, useState } from 'react'

type Props = {}

const CreatorPage = (props: Props) => {
    const[tasks,setTasks] = useState<taskItem[]>([]);
    const[tests,setTests] = useState<Test[]>([]);
    useEffect(()=>{
        const getData = async()=>{
            const tasksData = await getAllTasks()
            const testsData = await getAllTests()
            if(tasksData) setTasks(tasksData)
            if(testsData) setTests(testsData)
        }
    getData()
    },[])
    console.log(tests)
  return (
    <div className="flex justify-around mt-5 w-100">

        <div>
            <h1 className="font-bold">Tests:</h1>
            <TestList data={tests}/>
        </div>

        <div>
            <h1 className="font-bold">Tasks:</h1>
            <TaskList data={tasks}/>
        </div>
    </div>
  )
}

export default CreatorPage