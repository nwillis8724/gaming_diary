import React from "react";
import { useState, useEffect } from "react";



function GameDisplay() {
  const [games, setGames] = useState([]);
  const initialCommentValues = games.map(() => "")
  const [commentValues, setCommentValues] = useState("")
  const [currentGameId, setCurrentGameId] = useState(initialCommentValues)


    useEffect(() => {
        fetch("/games")
          .then((r) => r.json())
          .then((games) => setGames(games));
      }, []);



      function handleComment(e, game){
        e.preventDefault()
        setCurrentGameId(game.id)
        console.log(currentGameId)
        // const updatedGameData = {
        //     title: game.title,
        //     platform: game.platform,
        //     genre: game.genre,
        //     image: game.image,
        //   };
        // console.log(currentGameId)
        // fetch("/games", {
        //     method: "PATCH",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
            // body: JSON.stringify({ comment }),
        // }).then((r) => r.json())
        // .then((r) => console.log(r))
      }

      return (
    <div className="App">
      {games.map((game, i) => {
        return (
          <div className="game_card" key={i}>
            <button className="delete_button"> x </button>
            <h1 className="game_card_text" id="game_title">
              {game.title}
            </h1>
            <img className="game_image" src={game.image} alt={game.title} />
            <h2 className="game_card_text">Platform: {game.platform}</h2>
            <h3 className="game_card_text">Genre: {game.genre}</h3>
            <div className="comment_section">
              {game.comments && game.comments.length > 0 ? (
                game.comments.map((comment, i) => (
                  <div className="comment" key={i}>
                    <p>{comment.text}</p>
                    <p>{comment.rating}/5</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
              <div>
                <form onSubmit={(e) => handleComment(e, game, i)}>
                  <input
                    onChange={(e) => {
                      const newCommentValues = [...commentValues];
                      newCommentValues[i] = e.target.value;
                      setCommentValues(newCommentValues);
                    }}
                    value={commentValues[i]}
                    placeholder="Comment..."
                  ></input>
                  <button> Add </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
      <h1> </h1>
    </div>
  );
}

export default GameDisplay