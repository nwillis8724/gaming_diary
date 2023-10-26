import React from "react";
import { useState, useEffect } from "react";
import GameCards from "./GameCards";



function GameDisplay({user}) {
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
          <GameCards key={i} gamesArray={gamesArray} game={game} user={user} setGamesArray={setGamesArray} i={i}/>
        );
      })}
      <h1> </h1>
    </div>
  );
}

export default GameDisplay