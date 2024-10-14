import React, { useState } from "react"
import './navbar.css'
import {useTheme } from '../../Context/ThemeContext';


const Navbar = (props) => {

  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="navbar">
      <span className="app-title"> Hello, User </span>
      <div className="control-panel">
        <div className="sign-out">
          <i class="fa-solid fa-power-off"></i>
        </div>
        <div className="theme-selector" onClick={toggleTheme}>

            {theme === 'light' && <i class="fa-solid fa-sun"></i>}
            {theme === 'dark' && <i class="fa-solid fa-moon"></i>}
        </div>
      </div>
    </div>
  )
};

export default Navbar;
