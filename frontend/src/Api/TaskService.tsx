import axios from "axios"
import { taskItem } from "Models/Task";

export const getAllTasks =async ()=>{
    try{
        const response = await axios.get<taskItem[]>("http://localhost:5116/api/Task/GetAll")
        return response.data
    }catch(err)
    {
        console.log("getAllTasks error: ",err);
        throw err;
    }
}



export const getTaskById = async(id:string)=>{
    try{
        const response = await axios.get<taskItem>(`http://localhost:5116/api/Task/${id}`)
        return response.data
    }catch(err){
        console.error("getTaskById error: ",err);
    }
}

export const getTasksForTest=async (testId:number)=>{
    try{
        const response = await axios.get<taskItem[]>(`http://localhost:5116/api/Task/GetTasksForTest?testId=${testId}`)
        return response.data;
    }catch(err){
        console.error("getTasksForTestApi error: ",err)
    }
}

export const addSolutionForTask = async (appId:number,taskId:number,code:string)=>{
    try{
        const response = await axios.post("http://localhost:5116/api/Task/AddSolutionForTask",{
            applicationId:appId,
            taskId:taskId,
            code:code
        })
        return response.data
    }catch(err){
        console.error("addCodeForTask error: ",err)
        throw err;
    }
}