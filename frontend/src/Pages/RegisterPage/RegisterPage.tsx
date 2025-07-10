import { useAuth } from 'Context/useAuth';
import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {}


type RegisterFormInput={
    name:string;
    surname:string;
    phoneNumber:string;
    email:string;
    password:string;
    repeatPassword:string;
}

const RegisterPage = (props: Props) => {
    const {registerUser}=useAuth();
    const{register, handleSubmit}=useForm<RegisterFormInput>();

    const handleRegister =(form:RegisterFormInput)=>{
        registerUser(form.name,form.surname,form.phoneNumber,form.email,form.password,form.repeatPassword)
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
      Register
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>

    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            type="name"
            id="name"
            autoComplete="name"
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            {...register("name")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="surname" className="block text-sm font-medium text-gray-900">
          Surname
        </label>
        <div className="mt-2">
          <input
            type="surname"
            id="surname"
            autoComplete="surname"
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            {...register("surname")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <div className="mt-2">
          <input
            type="phoneNumber"
            id="phoneNumber"
            autoComplete="phoneNumber"
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            {...register("phoneNumber")}
          />
        </div>
      </div>

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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Password
          </label>
          
        </div>
        <div className="mt-2">
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            {...register("password")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-900">
          Repeat Password
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
          Sign in
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member? 
      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
        {" Create an account"}
      </a>
    </p>
  </div>
</div>
  )
}

export default RegisterPage