import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

const firstRun = !Math.round(Math.random());

function App() {
  const [startGame, setStartGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handlePlayerTurns = (checkedSymbol) => {
    setCurrentPlayer(checkedSymbol === "X" ? "O": "X")
  }

  const handleStartGame = () => {
    setStartGame(prev => !prev);
    let firstSymbol = firstRun ? "X" : "O";
    setCurrentPlayer(firstSymbol);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player isStart={startGame} currentPlayer ={currentPlayer} name={"Player 1"} symbol={"X"} />
          <Player isStart={startGame} currentPlayer ={currentPlayer} name={"Player 2"} symbol={"O"} />
        </ol>
        {!startGame ? <div id="pre-game">
          <button onClick={handleStartGame}>StartGame</button>
        </div> :
          <GameBoard handlePlayerTurns={handlePlayerTurns} symbol={currentPlayer} />}
      </div>
      LOG
    </main>
  )
}

export default App
