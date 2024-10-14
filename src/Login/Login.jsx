import React, { useState } from "react"
import './login.css'
import Applogo from '../Images/App-logo.png'

import { db, auth } from "../Firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = (props) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

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
            createUser(result.user);
            createUserInbox(result.user);           
        })
        .catch((error) => { setError(true);});
    }

    const createUser = async (user) => {
      try {
        
        // Reference Firestore document with the user's UID
        const userRef = doc(db, "users", user.uid); //Firestore instance
    
        // Set user data in Firestore
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
    
        console.log("User successfully created in Firestore");
      } catch (error) {
        console.error("Error creating user in Firestore:", error);
      }
    };

    const createUserInbox = async (user) => {

      try {

        const userInboxRef = doc(db, "userInbox", user.uid);
        
        await setDoc (userInboxRef, {});
        
        console.log("UserInbox successfully created in Firestore");
      } catch (error) {
        console.error("Error creating userInbox in Firestore:", error);
      }
    }

  return (
    <div className="login">
      <img src={Applogo} alt=""></img>
      <div className="button-div">
        {!user && <button className="sign-in" onClick={googleLogin}>Sign in with Google</button>}
        {error && <span> Oops! Try again.</span>}
      </div>
      
    </div>
  )
};

export default Login;
