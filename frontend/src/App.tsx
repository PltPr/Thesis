import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Modules/Navbar/Navbar.tsx';


function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  );
}

export default App;
