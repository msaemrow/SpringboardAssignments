import React from "react";
import "../css/Pokecard.css"


const IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

function Pokecard(props){
    let  imgUrl = `${IMG_URL}${props.id}.png`
    return (
        <div className="Pokecard">
            <h4 className="Pokecard-name">{props.name}</h4>
            <img className="Pokecard-img" src={imgUrl}/>
            <h6 className="Pokecard-type">Type: {props.type}</h6>
            <h6 className="Pokecard-exp">Exp: {props.baseExp}</h6>
        </div>
    )
}

export default Pokecard;