$(function(){
    let BASE_URL = "https://pokeapi.co/api/v2"

    // #1
    $.getJSON(`${BASE_URL}/pokemon/?limit=500`)
    .then(data => {
        console.log(data)
    })

    //#2
    $.getJSON(`${BASE_URL}/pokemon/?limit=500`)
    .then(data => {
        pokemonURLS = []
        for(let i=0; i<3; i++){
            let randNum = Math.floor(Math.random()* data.results.length);
            pokemonURLS.push(data.results[randNum].url)
            console.log(data.results[randNum])
        }
        return Promise.all(pokemonURLS.map(url => $.getJSON(url)));
    })
        .then(data => {
            data.forEach(pokemon => console.log(pokemon))
        })

    //#3
    $.getJSON(`${BASE_URL}/pokemon/?limit=500`)
    .then(data => {
        pokemonURLS = []
        for(let i=0; i<3; i++){
            let randNum = Math.floor(Math.random()* data.results.length);
            pokemonURLS.push(data.results[randNum].url)
        }
        return Promise.all(pokemonURLS.map(url => $.getJSON(url)));
    })
        .then(data => {
            names = data.map(pokemon => pokemon.name)
            return Promise.all(data.map(pokemon => $.getJSON(pokemon.species.url)))
        })
        .then(data => {
            let description = data.map(pokemon =>{
                let descObj = pokemon.flavor_text_entries.find(
                    entry => entry.language.name === "en"
                );
                return descObj ? descObj.flavor_text : "No description found.";
            });
            description.forEach((desc, i) => {
                console.log(`${names[i]}:- ${desc}`)
            });
        });


})