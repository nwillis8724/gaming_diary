import React from "react";


function GameDisplay({games}) {
    console.log(games, "display")
    return (
        <div>
            {games.map((game, i) =>{
                return(
                    <div>
                        <h1>{game.title}</h1>
                        <h2>Platform: {game.platform}</h2>
                        <h3>Genre: {game.genre}</h3>
                    </div>
                )
            })}
            <h1> </h1>
        </div>
    )
}

export default GameDisplay