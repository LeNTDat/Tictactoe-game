
const iniitialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(props) {
    let board = iniitialGameBoard;
    for (let turn of props.turns){
        const {position, player} = turn;
        const {row, col} = position;
        
        board[row][col] = player;
    }

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button disabled={playerSymbol} onClick={()=>{
                        props.handlePlayerTurns(rowIndex, colIndex)
                    }}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
} 