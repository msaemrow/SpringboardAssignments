import React from "react"
import headsImg from './assets/coin-heads.jpg';
import tailsImg from './assets/coin-tails.jpg';

function Coin({coinSide}){
    if (!coinSide) {
        return (
            <h5>
                Click the button to start the game!
            </h5>
        );
    }

    const coinImg = coinSide === "heads" ? headsImg : tailsImg;

    return(
        <div className="Coin">
        <img className="Coin-image" src={coinImg} alt={coinSide} />
        </div>
    )
}

export default Coin;