import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/useAuth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type LoginFormInput = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loginUser } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormInput>();

  const handleLogin = (form: LoginFormInput) => {
    loginUser(form.email, form.password);
  };

  // efekt fade-in + slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white flex justify-center items-start px-4">
      
      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 my-14"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Zaloguj się
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Witaj ponownie w <span className="text-blue-600 font-semibold">iTrack</span>
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              autoComplete="email"
              required
              {...register("email")}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Hasło
              </label>

              <Link
                to="/forgot-password-page"
                className="text-sm text-blue-600 hover:text-blue-500 font-semibold"
              >
                Zapomniałeś hasła?
              </Link>
            </div>

            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              {...register("password")}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold shadow-md hover:bg-blue-500 transition"
          >
            Zaloguj się
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Nie masz konta?
          <Link
            to="/register-page"
            className="text-blue-600 font-semibold hover:text-blue-500 ml-1"
          >
            Zarejestruj się
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
