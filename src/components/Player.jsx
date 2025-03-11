import { useState } from "react"

export default function Player(props) {
    const [playerName, setPlayerName] = useState(props.name);
    const [isEditting, setIsEditting] = useState(false)

    const handleOnEdit = (e)=>{
        setIsEditting(prev => !prev)
    }

    const handleSetInput = (e)=>{
        setPlayerName(e.target.value)
        props.setPlayer({
            name: e.target.value,
            symbol: props.symbol
        })
    }
    
    return <li className={`${props.currentPlayer === props.symbol && "active"}`}>
        <span className="player">
            <input value={playerName} onChange={handleSetInput} disabled={!isEditting || props.isStart}></input>
            <span className="player-symbol">{props.symbol}</span>
        </span>
        {!props.isStart && <button onClick={handleOnEdit}>{!isEditting ? "Edit" : "Save"}</button>}
    </li>
}