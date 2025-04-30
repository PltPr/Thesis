import axios from "axios"
import { UserProfileToken } from "../Models/User";

export const loginAPI = async(email:string,password:string)=>{
    try{
        const data = await axios.post<UserProfileToken>(``,{
            email:email,
            password:password
        });
        return data;
    }catch(error){
        console.error("Something went wrong", error)
        throw error;
    }
}

export const registerAPI = async(email:string,password:string)=>{
    try{
        const data = await axios.post<UserProfileToken>(``,{
            email:email,
            password:password
        });
        return data;
    }catch(error){
        console.error("Something went wrong", error);
        throw error;
    }
}