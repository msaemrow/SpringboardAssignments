import React from "react";
import "../css/Card.css"

function Card(props){
    return(
        <img 
        className="Card" 
        src={`https://deckofcardsapi.com/static/img/${props.cardId}.png`} 
        alt="Playing Card"
        />
    )
}

export default Card;