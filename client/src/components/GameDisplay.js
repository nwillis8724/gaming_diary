import React from "react";
import { useState, useEffect } from "react";



function GameDisplay() {
  const [games, setGames] = useState([]);


    useEffect(() => {
        fetch("/games")
          .then((r) => r.json())
          .then((games) => setGames(games));
      }, []);

    return (
        <div class="App">
            {games.map((game, i) =>{
                return(
                    <div id="game_card" key={i}>
                        <button> x </button>
                        <h1 id="game_title">{game.title}</h1>
                        <img id="game_image" src={game.image} alt={game.title}/>
                        <h2>Platform: {game.platform}</h2>
                        <h3>Genre: {game.genre}</h3>
                            <div id="comment_section">
                                {game.comments && game.comments.length > 0 ? (
                                    game.comments.map((comment, i) => (
                                        <div key={i}>
                                            <p>{comment.text}</p>
                                            <p>{comment.rating}/5</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </div>
                    </div>
                )
            })}
            <h1> </h1>
        </div>
    )
}

export default GameDisplay