import React from "react";
import Pokedex from './Pokedex'
import "../css/Pokegame.css"

const defPokemon = [
    {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
    {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
    {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
    {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
    {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
    {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
    {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
    {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
  ]

function Pokegame(){
    let pokedex1 = [...defPokemon];
    let pokedex2 = [];

    while (pokedex2.length < pokedex1.length){
        let removeIdx = Math.floor(Math.random()*pokedex1.length)
        let pokemon = pokedex1.splice(removeIdx, 1);
        pokedex2.push(pokemon[0])
    }

    let totalExp1 = pokedex1.reduce((acc, p) => acc + p.base_experience, 0)
    let totalExp2 = pokedex2.reduce((acc, p) => acc + p.base_experience, 0)
    

    return(
        <div className="Pokegame">
            
            <Pokedex name="Trainer 1" pokemon={pokedex1} exp={totalExp1} winner={totalExp1 > totalExp2}/>
            <Pokedex name="Trainer 2" pokemon={pokedex2} exp={totalExp2} winner={totalExp2 > totalExp1}/>
        </div>
    )
}

export default Pokegame;