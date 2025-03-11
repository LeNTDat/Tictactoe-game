import { useState } from "react"

const iniitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(props) {
    const [board, setBoard] = useState(iniitialGameBoard);

    const handleOnChecksymbol = (rowIndex, colIndex)=>{
        setBoard(prev =>{
            let updatedBoard = [...prev.map(innerArr =>[...innerArr])]
            updatedBoard[rowIndex][colIndex] = props.symbol;
            return updatedBoard;
        })
        props.handlePlayerTurns(props.symbol)
    }

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button disabled={playerSymbol} onClick={()=>{
                        handleOnChecksymbol(rowIndex, colIndex)
                    }}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
} 