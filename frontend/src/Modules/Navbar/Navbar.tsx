import React from 'react'
import "./Navbar.css";

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="navbar">
          {/* Logo */}
          <div className="logo">
            <img src="/itrack-logo.svg" alt="Logo" />
          </div>
    
          {/* Menu */}
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      );
}

export default Navbar