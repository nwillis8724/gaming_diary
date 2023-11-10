import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import Login from './components/Login';
import { useState, useEffect } from "react";
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import UploadGame from './components/UploadGame';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    setUser(null);
  }

  return (
    <BrowserRouter>
      <div className='app'>
        <NavBar user={user} setUser={onLogout} /> 
        <Routes>
          <Route
            path="/games_display"
            element={user ? <GameDisplay user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <Navigate to="/games_display" /> : <Login setUser={onLogin} user={user} />}
          />
          <Route 
            path="/sign_up" 
            element= {user? <Navigate to="/games_display" /> : <SignUp />}
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/" />} 
          />
                    <Route 
            path="/upload_game" 
            element={<UploadGame />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;