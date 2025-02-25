import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="navbar">
          {/* Logo */}
          
          <div className="logo">
          <Link to ="/" className="logo-link">
            <img src="/itrack-logo2.svg" alt="Logo" />
          </Link>
          </div>
        
          {/* Menu */}
          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      );
}

export default Navbar