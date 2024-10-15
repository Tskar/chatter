import './App.css';
import Login from './Login/Login';
import Canvas from './Components/Canvas/Canvas';
import { useAuth } from './Context/AuthContext';

function App() {

  const {currentUser}= useAuth();

  return (
    <div className="app">
      {!currentUser && <Login />}
      {currentUser && <Canvas />}
    </div>
  );
}

export default App;
