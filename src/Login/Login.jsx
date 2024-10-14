import React, { useState } from "react"
import './login.css'
import Applogo from '../Images/App-logo.png'

import app from "../Firebase/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const Login = (props) => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

        signInWithPopup(auth,provider).then((result)=> {
            setUser(result.user);            
        });
    }

    const signOut = async () => {
        await auth.signOut();
        setUser(null);
    }

  return (
    <div className="login">
      <img src={Applogo} alt=""></img>
      <div className="button-div">
        {!user && <button className="sign-in" onClick={googleLogin}>Sign in with Google</button>}

        {/*Testing signOut and user persistence. Will be moved to app canvas. */}
        {user && <button className="sign-in" onClick={signOut}>Sign Out</button>}
      </div>
      
    </div>
  )
};

export default Login;
