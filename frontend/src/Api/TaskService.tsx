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
        console.log("getTaskById error: ",err);
    }
}