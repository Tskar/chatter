import React, { useState } from "react"
import './login.css'
import Applogo from '../Images/App-logo.png'

import app from "../Firebase/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const Login = (props) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const auth = getAuth(app);
    const googleLogin = () => {

        setError(false);
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

        /* Prevent google to auto-sign and allow user to pick their account.*/
        provider.setCustomParameters({
            prompt: "select_account",
        });

        signInWithPopup(auth,provider).then((result)=> {
            setUser(result.user);            
        })
        .catch((error) => { setError(true);});
    }

    const signOut = async () => {
        await auth.signOut();
        setUser(null);
        setError(false);
    }

  return (
    <div className="login">
      <img src={Applogo} alt=""></img>
      <div className="button-div">
        {!user && <button className="sign-in" onClick={googleLogin}>Sign in with Google</button>}

        {/*Testing signOut and user persistence. Will be moved to app canvas. */}
        {user && <button className="sign-in" onClick={signOut}>Sign Out</button>}

        {error && <span> Oops! Try again.</span>}
      </div>
      
    </div>
  )
};

export default Login;
