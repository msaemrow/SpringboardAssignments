import React from "react";
import "../css/Joke.css"

const Joke = ({id, vote, votes, text, locked, toggleLocked}) => {
    return (
        <div className="Joke">
            <div className="Joke-text">{text}</div>
            <div className="Joke-vote-area">
                <p className="Joke-votes">Thums Up: {votes}</p>
                <button onClick={e => vote(id, +1)} className="Joke-up"> + </button>
                <button onClick={e => vote(id, -1)} className="Joke-down"> - </button>
                <button onClick={e => toggleLocked(id)} className="Joke-locked">{locked ? "locked" : "not locked"}</button>
            </div>
        </div>
    )
}

export default Joke;