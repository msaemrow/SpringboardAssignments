const baseURL = "https://pokeapi.co/api/v2"

//  PART 1
async function part1(){
    let res = await axios.get(`${baseURL}/pokemon/?limit=500`)
    console.log(res.data);
}

//  PART 2
async function part2(){
    let res = await axios.get(`${baseURL}/pokemon/?limit=500`)
    let pokemonURLs = [];
    for(let i=0; i<3; i++){
        let randNum = Math.floor(Math.random()* res.data.results.length);
        pokemonURLs.push(res.data.results[randNum].url)
    }
    let pokemonData = await Promise.all(
        pokemonURLs.map(url => axios.get(url))
    );
    pokemonData.forEach(p => console.log(p.data))
}

//  PART 3
async function part3(){
    let res = await axios.get(`${baseURL}/pokemon/?limit=500`)
    let pokemonURLs = [];
    for(let i=0; i<3; i++){
        let randNum = Math.floor(Math.random()* res.data.results.length);
        pokemonURLs.push(res.data.results[randNum].url)
    }
    let pokemonData = await Promise.all(
        pokemonURLs.map(url => axios.get(url))
    );
    console.log(pokemonData)
    let speciesData = await Promise.all(
        pokemonData.map(pokemon => axios.get(pokemon.data.species.url))
    );
    let pokemonDescriptions = speciesData.map(species => {
        let descriptionObj = species.data.flavor_text_entries.find(
            entry => entry.language.name === "en"
          );
          return descriptionObj
            ? descriptionObj.flavor_text
            : "No description available.";
    });
    pokemonDescriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].data.name}: ${desc}`);
      });
}