import './App.css';
import Login from './Login/Login';
import Canvas from './Components/Canvas/Canvas';
import { useAuth } from './Context/AuthContext';
import LoadImg from "./Images/loading-gif.gif"

import { useState, useEffect } from "react";

function App() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true); // loading state to avoid rendering canvas page before login.


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication status", error);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);


  if (loading) {
    return <img src={LoadImg} alt='Checking authentication status...'></img>;
  }

  return (
    <div className="app">
      {currentUser ? <Canvas /> : <Login />}
    </div>
  );
}

export default App;
