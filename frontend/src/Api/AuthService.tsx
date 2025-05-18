import axios from "axios"
import { UserProfileToken } from "../Models/User";

export const loginAPI = async(email:string,password:string)=>{
    try{
        const data = await axios.post<UserProfileToken>(`http://localhost:5116/api/account/login`,{
            email:email,
            password:password,
        });
        return data;
    }catch(error){
        console.error("Something went wrong", error)
        throw error;
    }
}

export const registerAPI = async(name:string,surname:string,phoneNumber:string,email:string,password:string,repeatPassword:string)=>{
    try{
        const data = await axios.post<UserProfileToken>(`http://localhost:5116/api/account/register`,{
            name:name,
            surname:surname,
            phoneNumber:phoneNumber,
            email:email,
            password:password,
            repeatPassword:repeatPassword
        });
        return data;
    }catch(error){
        console.error("Something went wrong", error);
        throw error;
    }
}


export const forgotPasswordApi = async (email:string)=>{
    try{
        const response = await axios.post(`http://localhost:5116/api/account/forgot-password`,{
            email:email
        })
        return response.data
    }catch(error){
        throw error;
    }
}
export const resetPasswordApi = async (token:string,email:string,newPassword:string)=>{
    try{
        const response = await axios.post(`http://localhost:5116/api/account/reset-password`,{
            token:token,
            email:email,
            newPassword:newPassword
        })
        return response.data
    }catch(error){
        throw error;
    }
}