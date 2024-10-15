import React from "react"
import './navbar.css'
import {useTheme } from '../../Context/ThemeContext';
import app from "../../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../Context/AuthContext";

const Navbar = (props) => {

  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  
  const auth = getAuth(app);


  const signOut = async () => {
    await auth.signOut();
}

  return (
    <div className="navbar">
      <span className="app-title"> Hello, {currentUser.displayName?.split(' ')[0]} </span>
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
