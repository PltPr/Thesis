import { forgotPasswordApi } from 'Api/AuthService';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {}

type ForgotPasswordForm = {
    email:string;
}



const ForgotPasswordPage = (props: Props) => {
    const{register,handleSubmit} = useForm<ForgotPasswordForm>();

    const handlePasswordForgot = async (form:ForgotPasswordForm)=>{
        try{
            await forgotPasswordApi(form.email)
        }catch{
            toast.warning("Something went wrong!")
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
        <form className="space-y-6" onSubmit={handleSubmit(handlePasswordForgot)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                {...register("email")}
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

export default ForgotPasswordPage