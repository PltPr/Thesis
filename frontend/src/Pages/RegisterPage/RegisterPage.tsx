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
    const{register, handleSubmit,watch,formState:{errors}}=useForm<RegisterFormInput>();

    const password = watch("password");

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

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              autoComplete="name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("name", { required: "Imię jest wymagane" })}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>
        </div>

        {/* Surname */}
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-900">Surname</label>
          <div className="mt-2">
            <input
              type="text"
              id="surname"
              autoComplete="surname"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("surname", { required: "Nazwisko jest wymagane" })}
            />
            {errors.surname && <p className="text-sm text-red-600 mt-1">{errors.surname.message}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">Phone Number</label>
          <div className="mt-2">
            <input
              type="tel"
              id="phoneNumber"
              autoComplete="tel"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("phoneNumber", {
                required: "Numer telefonu jest wymagany",
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Numer musi mieć 9 cyfr",
                },
              })}
            />
            {errors.phoneNumber && <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Nieprawidłowy format email",
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("password", {
                required: "Hasło jest wymagane",
                minLength: { value: 6, message: "Hasło musi mieć co najmniej 6 znaków" },
              })}
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
          </div>
        </div>

        {/* Repeat Password */}
        <div>
          <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-900">Repeat Password</label>
          <div className="mt-2">
            <input
              type="password"
              id="repeatPassword"
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 focus:outline-indigo-600 sm:text-sm"
              {...register("repeatPassword", {
                required: "Powtórz hasło",
                validate: (value) =>
                  value === password || "Hasła muszą być identyczne",
              })}
            />
            {errors.repeatPassword && <p className="text-sm text-red-600 mt-1">{errors.repeatPassword.message}</p>}
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">{" Sign in"}</a>
      </p>
    </div>
  </div>
)
}

export default RegisterPage