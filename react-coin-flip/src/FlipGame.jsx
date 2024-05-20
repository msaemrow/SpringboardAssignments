import React, { useState } from "react"
import Coin from "./Coin"
import "./FlipGame.css"

function FlipGame(){
    const [coin, setCoin] = useState({
        side: null,
        heads: 0,
        tails: 0
    })

    function headsOrTails(){
        const randNum = Math.floor(Math.random() * 2);
        const side = randNum === 1 ? "heads" : "tails";
        setCoin(prevState => ({
            ...prevState,
            side: side,
            heads: side === "heads" ? prevState.heads + 1 : prevState.heads,
            tails: side === "tails" ? prevState.tails + 1 : prevState.tails
        }))
    }
    return(
        <div className="FlipGame">
            <h1 className="FlipGame-title">Flip-a-Coin</h1>
            <Coin coinSide={coin.side} />
            <button className="FlipGame-button btn" onClick={headsOrTails}>Flip Coin</button>
            <p className="FlipGame-heads-count">Heads: {coin.heads}</p>
            <p className="FlipGame-tails-count">Tails: {coin.tails}</p>
        </div>
    )
}

export default FlipGame;