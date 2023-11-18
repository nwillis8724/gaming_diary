import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import Login from './components/Login';
import { useContext} from "react";
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import UploadGame from './components/UploadGame';
import { UserContext } from './contexts/UserContext';


function App() {
  const {user, setUser} = useContext(UserContext)

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
              path="/"
              element={user ? <Navigate to="/games_display" /> : <Login onLogin={onLogin} />}
            />
            <Route
              path="/games_display"
              element={user ? <GameDisplay/> : <Navigate to="/" />}
            />
            <Route 
              path="/sign_up" 
              element= {user? <Navigate to="/games_display" /> : <SignUp />}
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/" />} 
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