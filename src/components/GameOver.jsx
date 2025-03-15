export default function GameOver(props){
    return <div id="game-over">
        <h2>Game Over</h2>
        <p>{props.winner ? `The winner is ${props.winner}` : "Draw"}</p>
        <p>
            <button onClick={props.rematch}>Rematch!</button>
        </p>
    </div>
}