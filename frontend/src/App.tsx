import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Modules/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from 'Context/useAuth';


function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
