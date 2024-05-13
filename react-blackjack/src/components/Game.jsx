import React from "react";
import "../css/Game.css";
import Card from "./Card"
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const SUITS = ["C", "D", "H", "S"];

function pickCard(){
    let value = VALUES[Math.floor(Math.random() * VALUES.length)]
    let suit = SUITS[Math.floor(Math.random() * SUITS.length)]
    let card = value + suit;
    let score;
    const faceCardMap = {
        "A": 11,
        "J": 10,
        "Q": 10,
        "K": 10
    };
    score = faceCardMap[value] || parseInt(value) + 1;

    return {
        card: card,
        score: score
    };
}
function Game(props){
    let card1 = pickCard();
    let card2;
    do{
        card2 = pickCard();
    } while (card1.card === card2.card)

    let handTotal = card1.score + card2.score
    let message = null;
    if(handTotal > 21){
        message = "BUST";
    } else if(handTotal === 21){
        message = "BLACKJACK"
    } else{
        message = "HIT OR STAY??"
    }
    return(
        <div>
            <h1 className="Game-player">Player: {props.username}</h1>
            <Card cardId = {card1.card}/>
            <Card cardId = {card2.card}/>
            <h3 className="Game-score">Current score: {handTotal} </h3>
            <h2 className="Game-message">{message}</h2>
        </div>
    )
}

export default Game;