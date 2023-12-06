console.log("Let's get this party started!");

//global query selectors
const searchBtn = document.querySelector('#search');
const removeBtn = document.querySelector('#removeAll');
const searchBar = document.querySelector('#gifSearch');
const gifContainer = document.querySelector('#gifContainer');

const apiKey = 'Z6VCnD8wYkbE6YhBePpn1fve68Xawlu6';

async function getGifs(searchTerm){
    const res = await axios.get('//api.giphy.com/v1/gifs/search', {params: {api_key:apiKey, q:searchTerm, limit:5}});
    console.log(res.data.data);
    let randIndex = Math.floor(Math.random() * res.data.data.length)
    return res.data.data[randIndex].images.downsized_medium.url;
}

async function getGifArr(searchTerm){
    const res = await axios.get('//api.giphy.com/v1/gifs/search', {params: {api_key:apiKey, q:searchTerm, limit:5}});
    return res.data.data
}
// accepts an array and loops over to add all gifs to the page
function printAllGifs(arr){
    for(let gif of arr){
        let gifUrl = gif.images.downsized_medium.url;
        let newGif = document.createElement('img');
        newGif.setAttribute('src', gifUrl);
        gifContainer.prepend(newGif);
    }
}

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const gifArr = await getGifArr(searchBar.value);
    console.log(gifArr);
    printAllGifs(gifArr);
});

removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gifContainer.innerHTML = '';
})