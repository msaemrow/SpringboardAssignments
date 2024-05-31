import React, { useState } from "react";
import pokemonList from "./pokemonList";
import { choice } from "./helpers";

/* Select element to choose from common pokemon. */
function PokemonSelect({ add, clear, pokemon = pokemonList }) {
  const [pokeIdx, setPokeIdx] = useState(0);
  const handleChange = evt => {
    setPokeIdx(evt.target.value);
  };
  
  const handleAddPokemon = () => {
    const pokemonName = pokemon[pokeIdx];
    add(pokemonName);
  }

  const handleClearPokemon = () => {
    clear();
  }

  return (
    <div>
      <select onChange={handleChange}>
        {pokemon.map((p, idx) => (
          <option key={idx} value={idx}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={handleAddPokemon}>Catch one!</button>
      <button onClick={() => add(choice(pokemon))}>I'm feeling lucky</button>
      <button onClick={handleClearPokemon}>Release all Pokemon!</button>
    </div>
  );
}

export default PokemonSelect;
