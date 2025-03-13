import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_TEMPLATE } from "./Winning_template";

const firstRun = !Math.round(Math.random());

function App() {
  const [startGame, setStartGame] = useState(false);
  const [gameTurn, setGameTurn] = useState([])

  const iniitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  let board = iniitialGameBoard;
  let winner = null;
  for (let turn of gameTurn) {
    const { position, player } = turn;
    const { row, col } = position;

    board[row][col] = player;
  }

  const deriveActivePlayer = (gameTurn) => {
    let currentPlayer = "X";
    if (gameTurn.length > 0 && gameTurn[0].player === "X") {
      currentPlayer = "O"
    }
    return currentPlayer;
  }
  let currentPlayer = deriveActivePlayer(gameTurn);

  for (let combination of WINNING_TEMPLATE) {
    const firstSymol = board[combination[0].row][combination[0].col];
    const secondSymol = board[combination[1].row][combination[1].col];
    const thirdSymol = board[combination[2].row][combination[2].col];

    if (firstSymol && firstSymol === secondSymol && secondSymol === thirdSymol) {
      winner = firstSymol
    }
  }

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
          <>
            {winner && "You won"}
            <GameBoard handlePlayerTurns={handlePlayerTurns} gameOver={!!winner} board={board} />
          </>
        }
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
