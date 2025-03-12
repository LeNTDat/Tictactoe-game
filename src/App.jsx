import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";

const firstRun = !Math.round(Math.random());

function App() {
  const [startGame, setStartGame] = useState(false);
  const [gameTurn, setGameTurn] = useState([])

  const deriveActivePlayer = (gameTurn)=>{
    let currentPlayer = "X";
    if(gameTurn.length > 0 && gameTurn[0].player === "X"){
      currentPlayer = "O"
    }
    return currentPlayer;
  }
  let currentPlayer = deriveActivePlayer(gameTurn) ;

  const handlePlayerTurns = (rowIndex, colIndex) => {
    setGameTurn(prev => {
      let currentPlayer = deriveActivePlayer(prev)
      let updatedTurn = [
        {
          position: {
            row: rowIndex, col: colIndex
          },
          player: currentPlayer
        },
        ...prev
      ];
      return updatedTurn;
    })
  }

  const handleStartGame = () => {
    setStartGame(prev => !prev);
    let firstSymbol = firstRun ? "X" : "O";
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player isStart={startGame} currentPlayer={currentPlayer} name={"Player 1"} symbol={"X"} />
          <Player isStart={startGame} currentPlayer={currentPlayer} name={"Player 2"} symbol={"O"} />
        </ol>
        {!startGame ? <div id="pre-game">
          <button onClick={handleStartGame}>StartGame</button>
        </div> :
          <GameBoard handlePlayerTurns={handlePlayerTurns} turns={gameTurn} />}
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
