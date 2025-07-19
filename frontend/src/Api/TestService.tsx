import axios from "axios"
import { Test } from "Models/Test"

export const getAllTests=async()=>{
    try{
        const response = await axios.get<Test[]>("http://localhost:5116/api/Test/GetAll")
        return response.data
    }catch(err){
        console.log("getAllTests error: ",err)
        throw err;
    }
}