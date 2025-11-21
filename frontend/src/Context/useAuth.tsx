import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutApi, registerAPI } from "../Api/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"

type UserContextType={
    user:UserProfile | null;
    registerUser:(name:string,surname:string,phoneNumber:string,email:string,password:string,repeatPassword:string)=>void;
    loginUser:(email:string,password:string)=>void;
    logout:()=>void;
    isLoggedIn:()=>boolean;
    isAdmin:()=>boolean;
}

type Props={children:React.ReactNode};

const UserContext=createContext<UserContextType>({} as UserContextType)

export const UserProvider=({children}:Props)=>{
    const navigate = useNavigate();
    const [user,setUser]= useState<UserProfile|null>(null);
    const [isReady,setIsReady]=useState(false);


useEffect(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    setUser(JSON.parse(userStr));
  }
  setIsReady(true);
}, []);


const registerUser = async(name:string,surname:string,phoneNumber:string,email:string,password:string,repeatPassword:string)=>{
    try {
        const res = await registerAPI(name,surname,phoneNumber,email, password,repeatPassword);
        if (res) {
            const userObj = {
                name:res?.data.name,
                surname:res?.data.surname,
                phoneNumber:res?.data.phoneNumber,
                email: res?.data.email,
                roles:res?.data.roles
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(userObj!);
            toast.success("Register success");
            navigate("/");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            if (error) {
                toast.warning("Server error occurred");
            } 
         }else {
            toast.warning("Network error. Please try again later.");
        }
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        const res = await loginAPI(email, password);
        if (res) {


            const userObj = {
                name:res?.data.name,
                surname:res?.data.surname,
                phoneNumber:res?.data.phoneNumber,
                email: res?.data.email,
                roles:res?.data.roles
            };
            localStorage.setItem("user", JSON.stringify(userObj));

            setUser(userObj!);
            toast.success("Login success");
            navigate("/");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                toast.warning("Email or password is incorrect");
            } else {
                toast.warning("Server error occurred");
            }
        } else {
            toast.warning("Network error. Please try again later.");
        }
    }
};




const isLoggedIn=()=>{
    return !!user;
};

const isAdmin=()=>{
    if(user?.roles&&user?.roles.includes("Admin"))
        return true;
    return false;
}

const logout=async ()=>{
    localStorage.removeItem("user");
    setUser(null);
    await logoutApi();
    navigate("/");
    
}

return (
<UserContext.Provider value={{loginUser,user,logout,isLoggedIn,registerUser,isAdmin}}>
    {isReady ? children : null}
</UserContext.Provider>
)
};

export const useAuth = ()=>React.useContext(UserContext);