import React from "react";
import { useState, useEffect, useContext } from "react";
import GameCards from "./GameCards";
import { UserContext } from "../contexts/UserContext";



function GameDisplay() {
  // const {user} = useContext(UserContext)

  const [gamesArray, setGamesArray] = useState([]);

    useEffect(() => {
        fetch("/games")
          .then((r) => r.json())
          .then((games) => setGamesArray(games));
      }, []);

      return (
    <div className="App">
      {gamesArray.map((game, i) => {
        return (
          <GameCards key={i} gamesArray={gamesArray} game={game} setGamesArray={setGamesArray} i={i}/>
        );
      })}
      <h1> </h1>
    </div>
  );
}

export default GameDisplay