import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutApi, registerAPI } from "../Api/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import api from "Api/api";


type UserContextType={
    user:UserProfile | null;
    registerUser:(name:string,surname:string,phoneNumber:string,email:string,password:string,repeatPassword:string)=>void;
    loginUser:(email:string,password:string)=>void;
    logout:()=>void;
    isLoggedIn:()=>boolean;
    isAdmin:()=>boolean;
    isExaminer:()=>boolean;
}

type Props={children:React.ReactNode};

const UserContext=createContext<UserContextType>({} as UserContextType)

export const setAxiosToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};


export const UserProvider=({children}:Props)=>{
    const navigate = useNavigate();
    const [user,setUser]= useState<UserProfile|null>(null);
    const [isReady,setIsReady]=useState(false);


useEffect(() => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  console.log("Loaded token from storage:", token);
  if (userStr) {
    setUser(JSON.parse(userStr));
  }
  if (token) setAxiosToken(token);
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
            localStorage.setItem("token", res.data.token);
            setAxiosToken(res.data.token);
            setUser(userObj!);
            toast.success("Register success");
            navigate("/");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data.message;
            toast.warning(message)
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
            localStorage.setItem("token", res.data.token);
            setAxiosToken(res.data.token);

            setUser(userObj!);
            toast.success("Login success");
            navigate("/");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data.message;
            toast.warning(message);
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
const isExaminer =()=>{
    if(user?.roles&&user.roles.includes("Examiner")&&!user.roles.includes("Admin"))
        return true;
    return false;
}

const logout=async ()=>{
    localStorage.removeItem("user");
    setUser(null);
    await logoutApi();
    localStorage.removeItem("token");
    setAxiosToken(null);
    navigate("/");
    
}

return (
<UserContext.Provider value={{loginUser,user,logout,isLoggedIn,registerUser,isAdmin,isExaminer}}>
    {isReady ? children : null}
</UserContext.Provider>
)
};

export const useAuth = ()=>React.useContext(UserContext);