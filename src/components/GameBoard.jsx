

export default function GameBoard(props) {
    

    return <ol id="game-board">
        {props.board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button disabled={playerSymbol || props.gameOver} onClick={()=>{
                        props.handlePlayerTurns(rowIndex, colIndex)
                    }}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
} 