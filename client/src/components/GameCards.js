import { React } from "react";
import CommentSection from "./CommentSection";


function GameCards({game, gamesArray, i, setGamesArray}){

      function handleDeleteGame(game) {
        fetch(`/games/${game.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              console.log('Network response was not ok');
            }
          })
          .then(() => {
            const updatedGames = gamesArray.filter((g) => g.id !== game.id);
            setGamesArray(updatedGames);
        })
        .catch((error) => {
            console.error('Error deleting game:', error);
        });
    }
    return(
        <div className="game_card"  key={i}>
            <button className="delete_button" onClick={(e) => handleDeleteGame(game)}> 🗑️ </button>
            <h1 className="game_card_text" id="game_title">
              {game.title}
            </h1>
            <img className="game_image" src={game.image} alt={game.title} />
            <h2 className="game_card_text">Platform: {game.platform}</h2>
            <h3 className="game_card_text">Genre: {game.genre}</h3>
            <h3 className="game_card_text">Release Date: {game.release_date}</h3>
            <CommentSection game={game} gamesArray={gamesArray} i={i} setGamesArray={setGamesArray}/>
          </div>
    )
}

export default GameCards