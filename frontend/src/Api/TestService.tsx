import axios from "axios"
import { Test } from "Models/Test"

export const getAllTestsApi=async()=>{
    try{
        const response = await axios.get<Test[]>("http://localhost:5116/api/Test/GetAll")
        return response.data
    }catch(err){
        console.log("getAllTests error: ",err)
        throw err;
    }
}
export const getTestByIdApi = async(testId:number)=>{
    try{
        const response = await axios.get<Test>(`http://localhost:5116/api/Test/${testId}`)
        return response.data;
    }catch(err){
        console.error("getTestByIdApiError",err)
        throw err;
    }
}