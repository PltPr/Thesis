import { resetPasswordApi } from 'Api/AuthService';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {}

type ResetPasswordForm={
    password:string;
    repeatPassword:string;
}

const ResetPasswordPage = (props: Props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    const navigate=useNavigate();

    const {register, handleSubmit}=useForm<ResetPasswordForm>();

    if (!email || !token) {
        return <Navigate to="/"/>
      }

    const passwordCheck =(password:string,repeatPassword:string)=>{
        if(password!==repeatPassword){
            toast.warning("Passwords do not match")
            return false;
        };
        return true;
    }
    

    const handlePasswordChange = async(form:ResetPasswordForm)=>{
        try{
            if(!passwordCheck(form.password,form.repeatPassword)){
                return;
            };
            await resetPasswordApi(token,email,form.password)
            toast.success("Password changed successfully");
            navigate("/");
        }catch(error){
            toast.warning("Something went wrong")
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handlePasswordChange)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                autoComplete="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                {...register("password")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="repeatPassword"
                autoComplete="repeatPassword"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                {...register("repeatPassword")}
              />
            </div>
          </div>
    
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm
            </button>
          </div>
        </form>
    
        
      </div>
    </div>
  )
}

export default ResetPasswordPage