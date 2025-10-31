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
export const finishTestApi = async(appId:number)=>{
    try{
        const response = await axios.put(`http://localhost:5116/api/Test/FinishTest/${appId}`)
    }catch(err){
        console.error("finishTestApiError: ",err)
        throw err;
    }
}

export const startTestApi = async (appId:number)=>{
    try{
        const response = await axios.put(`http://localhost:5116/api/Test/StartTest/${appId}`)
    }catch(err){
        console.log("startTestApiError: ",err)
        throw err;
    }
}