import { useAuth } from 'Context/useAuth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type RegisterFormInput = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInput>();

  const password = watch("password");

  const handleRegister = (form: RegisterFormInput) => {
    registerUser(form.name, form.surname, form.phoneNumber, form.email, form.password, form.repeatPassword);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white flex items-center justify-center px-4">

      {/* CARD */}
      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Stwórz konto
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Dołącz do <span className="text-blue-600 font-semibold">iTrack</span>
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleRegister)}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Imię</label>
            <input
              type="text"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: "Imię jest wymagane" })}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Nazwisko</label>
            <input
              type="text"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("surname", { required: "Nazwisko jest wymagane" })}
            />
            {errors.surname && <p className="text-sm text-red-600 mt-1">{errors.surname.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Numer telefonu</label>
            <input
              type="tel"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("phoneNumber", { required: "Numer telefonu jest wymagany" })}
            />
            {errors.phoneNumber && <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email jest wymagany" })}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Hasło</label>
            <input
              type="password"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Hasło jest wymagane",
                minLength: { value: 6, message: "Minimum 6 znaków" }
              })}
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Powtórz hasło</label>
            <input
              type="password"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
              {...register("repeatPassword", {
                required: "Powtórz hasło",
                validate: value => value === password || "Hasła muszą się zgadzać"
              })}
            />
            {errors.repeatPassword && <p className="text-sm text-red-600 mt-1">{errors.repeatPassword.message}</p>}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold shadow-md hover:bg-blue-500 transition"
          >
            Zarejestruj się
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Masz już konto?
          <Link to="/login-page" className="text-blue-600 font-semibold hover:text-blue-500 ml-1">
            Zaloguj się
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
