import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const [games, setGames] = useState([])

  useEffect(() =>{
  fetch("/games")
      .then((r) => r.json())
      .then((games) => setGames(games))
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<GameDisplay games={games}/>} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
