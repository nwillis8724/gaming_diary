import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import Login from './components/Login';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            exact
            path="/games"
            element={user ? <GameDisplay /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/games"/> : <Login setUser={onLogin} user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;