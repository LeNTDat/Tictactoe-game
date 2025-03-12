export default function Log(props) {
    return <ol id="log">
        {props.turns.map(item => <li className="highlighted" key={`${item.player} + ${Math.random()}`}>
            <span >
                {`${item.player} -> row : ${item.position.row}, col : ${item.position.col}` }
            </span>
        </li>)}
    </ol>
}