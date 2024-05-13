import React from "react";
import Pokecard from "./Pokecard";
import '../css/Pokedex.css'

function Pokedex(props){
    let alert = null;
    if(props.winner){
        alert = <p className="Pokedex-winner">{props.name} WINS!!</p>
    }
    return(
        <div className="Pokedex">
            {alert}
            <h2 className="Pokedex-title">{props.name}'s Pokedex</h2>
            <div className="Pokedex-all-pokemon">
                {props.pokemon.map(p=>
                    <Pokecard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        type={p.type}
                        baseExp = {p.base_experience}
                    />
                )}
            </div>

            <h3>Total Exp: {props.exp}</h3>

        </div>
    )
}

export default Pokedex;