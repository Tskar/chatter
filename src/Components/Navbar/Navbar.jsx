import React, { useState } from "react"
import './navbar.css'
import {useTheme } from '../../Context/ThemeContext';
import app from "../../Firebase/firebase";
import { getAuth } from "firebase/auth";

const Navbar = (props) => {

  const { theme, toggleTheme } = useTheme();
  const auth = getAuth(app);  

  const signOut = async () => {
    await auth.signOut();
}

  return (
    <div className="navbar">
      <span className="app-title"> Hello, User </span>
      <div className="control-panel">
        <div className="sign-out" onClick={signOut}>
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
