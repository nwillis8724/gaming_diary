import React from "react";


function GameDisplay({games}) {
    console.log(games, "display")
    return (
        <div>
            {games.map((game, i) =>{
                return(
                    <div id="game_card" key={i}>
                        <button> x </button>
                        <h1>{game.title}</h1>
                        <h2>Platform: {game.platform}</h2>
                        <h3>Genre: {game.genre}</h3>
                        <div id="comment_section">
                            {game.comments.map((comment, i) => {
                                return (
                                <div>
                                    <p>{comment.text}</p>
                                    <p>{comment.rating}/5</p>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <h1> </h1>
        </div>
    )
}

export default GameDisplay