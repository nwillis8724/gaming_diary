import React from "react";
import { useState, useEffect } from "react";

function GameCards({game, gamesArray, user, i, setGamesArray}){
    const [commentValues, setCommentValues] = useState([""])
    const [ratingValues, setRatingValues] = useState([""])

    function resetCommentValue(i) {
        const newCommentValues = [...commentValues];
        newCommentValues[i] = "";
        setCommentValues(newCommentValues);
      
        const newRatingValues = [...ratingValues];
        newRatingValues[i] = "";
        setRatingValues(newRatingValues);
      }

      function handleComment(e, game, i) {
        e.preventDefault();
      
        const newComment = {
          text: commentValues[i],
          rating: ratingValues[i],
          game_id: game.id,
          user_id: `${user.id}`,
        };
      
        fetch("/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((newComment) => {
            const updatedGames = gamesArray.map((g) => {
              if (g.id === game.id) {
                g.comments.push(newComment);
              }
              return g;
            });
            setGamesArray(updatedGames);
          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });
      
        resetCommentValue(i);
      }

      function handleDeleteComment(comment) {
        fetch(`/comments/${comment.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          })
          .then(() => {
            const updatedGames = gamesArray.map((game) => {
              if (game.id === comment.game_id) {
                game.comments = game.comments.filter((c) => c.id !== comment.id);
              }
              return game;
            });
      
            setGamesArray(updatedGames);
          })
          .catch((error) => {
            console.error('Error deleting comment:', error);
          });
      }

    return(
        <div className="game_card"  key={i}>
            <button className="delete_button"> 🗑️ </button>
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
                    <button className="delete_button" onClick={(e) => handleDeleteComment(comment)}> 🗑️ </button>
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
                  <input className="rating_value"
                    onChange={(e) => {
                      const newRatingValues = [...ratingValues];
                      newRatingValues[i] = e.target.value;
                      setRatingValues(newRatingValues);
                    }}
                    value={ratingValues[i]}
                    placeholder="Rating /5..."
                  ></input>
                  <button className="submit_button"> Add </button>
                </form>
              </div>
            </div>
          </div>
    )
}

export default GameCards