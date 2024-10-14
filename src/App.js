import { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import Canvas from './Components/Canvas/Canvas';

function App() {

  const [ currentUser, setCurrentUser ] = useState("Temp State");
  return (
    <div className="app">
      {!currentUser && <Login />}
      {currentUser && <Canvas />}
    </div>
  );
}

export default App;
