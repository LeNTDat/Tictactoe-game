import { useState } from "react"

export default function Player(props) {
    const [playerName, setPlayerName] = useState(props.name);
    const [isEditting, setIsEditting] = useState(false)

    const handleOnEdit = (e)=>{
        setIsEditting(prev => !prev)
    }

    const handleSetInput = (e)=>{
        console.log(e.target.id)
        setPlayerName(e.target.value)
    }

    return <li>
        <span className="player">
            <input id={"asdqw"} value={playerName} onChange={handleSetInput} disabled={!isEditting}></input>
            <span className="player-symbol">{props.symbol}</span>
        </span>
        <button onClick={handleOnEdit}>{!isEditting ? "Edit" : "Save"}</button>
    </li>
}