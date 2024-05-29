import React from "react";
import "../css/Card.css"

function Card({ value, image }){
    return(
        <div className="Card">
            <p className="Card-name">{value}</p>
            <img className="Card-image" src={image} alt={value} />
        </div>
    )
}

export default Card;