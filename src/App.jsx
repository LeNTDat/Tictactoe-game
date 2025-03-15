import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_TEMPLATE } from "./Winning_template";
import GameOver from "./components/GameOver";

const PLAYER = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const deriveActivePlayer = (gameTurn) => {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer;
}

const deriveWinner = (board, playerName) => {
  let winner = null;

  for (let combination of WINNING_TEMPLATE) {
    const firstSymol = board[combination[0].row][combination[0].col];
    const secondSymol = board[combination[1].row][combination[1].col];
    const thirdSymol = board[combination[2].row][combination[2].col];

    if (firstSymol && firstSymol === secondSymol && secondSymol === thirdSymol) {
      winner = playerName[firstSymol]
    }
  }
  return winner;
}

const deriveGameBoard = (gameTurn) => {
  let board = [...INITIALGAMEBOARD.map(item => ([...item]))]
  for (let turn of gameTurn) {
    const { position, player } = turn;
    const { row, col } = position;

    board[row][col] = player;
  }
  return board
}

function App() {
  const [startGame, setStartGame] = useState(false);
  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYER);
  const board = deriveGameBoard(gameTurn);
  const currentPlayer = deriveActivePlayer(gameTurn);
  const winner = deriveWinner(board, playerName);
  const hasDraw = gameTurn.length === 9 && !winner;

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

  const handleRematchGame = () => {
    setGameTurn([]);
    setStartGame(false);
  }

  const handlePlayerName = (symbol, newName) => {
    setPlayerName(prev => {
      return {
        ...prev,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player handlePlayerName={handlePlayerName} isStart={startGame} currentPlayer={currentPlayer} name={PLAYER.X} symbol={"X"} />
          <Player handlePlayerName={handlePlayerName} isStart={startGame} currentPlayer={currentPlayer} name={PLAYER.O} symbol={"O"} />
        </ol>
        {!startGame ? <div id="pre-game">
          <button onClick={handleStartGame}>StartGame</button>
        </div> :
          <>
            {(winner || hasDraw) && <GameOver rematch={handleRematchGame} winner={winner} />}
            <GameBoard handlePlayerTurns={handlePlayerTurns} gameOver={!!winner} board={board} />
          </>
        }
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
