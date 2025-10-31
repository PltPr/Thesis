import { addSolutionForTask, getTasksForTest, getTasksForTestSolution } from 'Api/TaskService'
import { taskItem, taskItemForSolving } from 'Models/Task'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CompileCode } from 'Api/CompileService'
import { CompilationResult } from 'Models/Compilation'
import { finishTestApi } from 'Api/TestService'

type Props = {}

const SolveTestPage = (props: Props) => {
    const {appId,testId} = useParams<{appId:string,testId:string}>()
    const[tasksList,setTasksList]=useState<taskItemForSolving[]|null>(null)
    const[currentIndex,setCurrentIndex]=useState(0);
    const[loading,setLoading]=useState(true);
    const[userCode,setUserCode]=useState<string>("");
    const[submitting,setSubmitting]=useState(false);
    const[compilationResult,setCompilationResult]=useState<CompilationResult|null>(null)

    const navigate=useNavigate();

    useEffect(()=>{
        const getTasks = async()=>{
            try{
                const tasksData = await getTasksForTestSolution(Number(testId));
                if(tasksData)
                {
                  const unsolvedTasks = tasksData.filter(task=>!task.isSolved)
                  setTasksList(unsolvedTasks)
                }
                  
            }catch(err){
                console.error("GetTasksList error")
            }finally{
            setLoading(false)
        }
        }
        getTasks();
    },[testId])

    const addSolution = async()=>{
      if(submitting) return false
      setSubmitting(true)
      try{
        if(tasksList)
        {
          const formattedCode = userCode
          const response = await addSolutionForTask(Number(appId),tasksList?.[currentIndex]?.id,formattedCode)
          return true;
        }
        
      }catch(err){
        console.log("Send solution error: ",err)
        toast.error("Something went wrong!")
      }finally{
        setSubmitting(false);
      }
    }

    const compileCode = async()=>{
      try{
        if(userCode)
        {
          const formattedCode = userCode


          const compileResponse = await CompileCode("java",formattedCode);
          if(compileResponse) setCompilationResult(compileResponse)
            console.log(formattedCode)
        }
      }catch(err){
        toast.warning("Something went wrong");
      }
    }

    const handleNextTask =async  ()=>{
        const success = await addSolution();
        if(!success) return;
        if(tasksList&&currentIndex<tasksList.length-1){
            toast.success("Solution added")
            setCurrentIndex((prev)=>prev+1);
            setUserCode("");
        }else{
            await finishTestApi(Number(appId))
            toast.info("Test completed")
            navigate('/');
        }
    }

    if (loading) return <div className="p-5 text-gray-500">Loading tasks...</div>;
    if (!tasksList || tasksList.length === 0)
    return <div className="p-5 text-gray-500">No tasks available for this test.</div>;

    const currentTask = tasksList[currentIndex];

  return (
    <>
     <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Solve Test</h1>
      <h2 className="text-xl font-medium mb-2">
        Task {currentIndex + 1} / {tasksList?.length ?? 0}
      </h2>
      <div className="border p-4 rounded-md bg-gray-50 mb-4">
        <h3 className="font-bold mb-2">{currentTask.description}</h3>
        <p className="mb-3">{currentTask.description}</p>
        
        {currentTask.expectedOutput && (
          <div className="mb-2">
            <strong>Expected output:</strong>
            <pre className="bg-gray-200 p-2 rounded">{currentTask.expectedOutput}</pre>
          </div>
        )}
      </div>
      <button className='bg-green-500 py-2 px-1 m-2' onClick={compileCode}>Compile</button>
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        className="w-full h-40 border rounded p-2 font-mono"
        placeholder="Write your solution code here..."
      />
      

      <div className="flex justify-end mt-4">
        <button
          disabled={submitting}
          onClick={handleNextTask}
          className={`px-4 py-2 bg-blue-600 text-white ${submitting ? "bg-gray-400" :  "hover:bg-blue-700 "} `}
        >
          {submitting ? "Saving..." : currentIndex < tasksList.length - 1 ? "Next Task" : "Finish Test"}
        </button>
      </div>
    </div>
    <div>
      <h1>Console</h1>
      <div className='bg-gray-800 w-1/3 h-1/3 m-3 text-white'>
          {compilationResult?.success}
          {compilationResult?.output}
          {compilationResult?.error}
      </div>
    </div>
    </>
  )
}

export default SolveTestPage