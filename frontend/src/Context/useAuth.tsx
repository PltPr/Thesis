import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Api/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"

type UserContextType={
    user:UserProfile | null;
    token:string | null;
    registerUser:(email:string,password:string)=>void;
    loginUser:(email:string,password:string)=>void;
    logout:()=>void;
    isLoggedIn:()=>boolean;
    isAdmin:()=>boolean;
}

type Props={children:React.ReactNode};

const UserContext=createContext<UserContextType>({} as UserContextType)

export const UserProvider=({children}:Props)=>{
    const navigate = useNavigate();
    const [token,setToken]=useState<string | null>(null);
    const [user,setUser]= useState<UserProfile|null>(null);
    const [isReady,setIsReady]=useState(false);


    useEffect(()=>{
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token){
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"]="Bearer "+token;
        }
        setIsReady(true);
    },[])


const registerUser = async(email:string, password:string)=>{
    try {
        const res = await registerAPI(email, password);
        if (res) {
            localStorage.setItem("token", res?.data.token);
            const userObj = {
                email: res?.data.email,
                role:["User"]
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res?.data.token!);
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
        console.log("Response:", res);
        if (res) {
            console.log("Token from API:", res.data.token);
            localStorage.setItem("token", res.data.token);

            const decodedToken: any = jwtDecode(res.data.token);

            const roles = decodedToken?.role || [];
            console.log("Roles: ", roles);

            const userObj = {
                email: res?.data.email,
                role:roles
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res?.data.token!);
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
    if(user?.role&&user?.role.includes("Admin"))
        return true;
    return false;
}

const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
}

return (
<UserContext.Provider value={{loginUser,user,token,logout,isLoggedIn,registerUser,isAdmin}}>
    {isReady ? children : null}
</UserContext.Provider>
)
};

export const useAuth = ()=>React.useContext(UserContext);