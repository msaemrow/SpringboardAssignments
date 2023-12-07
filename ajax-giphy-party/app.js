//global query selectors
const searchBtn = document.querySelector('#search');
const removeBtn = document.querySelector('#removeAll');
const searchBar = document.querySelector('#gifSearch');
const gifContainer = document.querySelector('#gifContainer');
const apiKey = 'Z6VCnD8wYkbE6YhBePpn1fve68Xawlu6';

//returns an array of gif objects based on the search term
//used in the searchBtn and gifContainer eventListeners
async function getGifArr(searchTerm){
    const res = await axios.get('//api.giphy.com/v1/gifs/search', {params: {api_key:apiKey, q:searchTerm, limit:25}});
    return res.data.data;
}

// accepts an array and loops over to add all gifs to the page
//used in the searchBtn eventListener
function printAllGifs(arr){
    for(let gif of arr){
        let gifUrl = gif.images.preview_gif.url;
        let newGif = document.createElement('img');
        newGif.setAttribute('src', gifUrl);
        newGif.setAttribute('id', gif.id)
        gifContainer.prepend(newGif);
    }
}

//changes the URL of the gif to make the gif larger or smaller
//used in the gifContainer eventListener
function setGifSize(event, gifArr){
    let index = gifArr.findIndex(gif => gif.id === event.target.id);
    const mediumUrl = gifArr[index].images.downsized_medium.url;
    const smallUrl = gifArr[index].images.preview_gif.url
    if(event.target.src === gifArr[index].images.downsized_medium.url){
        event.target.setAttribute('src', smallUrl)
    } else {
        event.target.setAttribute('src', mediumUrl);
    }
}

//all event listeners
//appends 25 gifs to the gifContainer on the page
searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    gifContainer.innerHTML = '';
    const gifArr = await getGifArr(searchBar.value);
    printAllGifs(gifArr);
});

//clears the HTML of the gifContainer div so no gifs are showing
removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gifContainer.innerHTML = '';
})

//click on a gif to make it larger for better viewing. click again to go back to preview size
gifContainer.addEventListener('click', async (e) => {
    const gifArr = await getGifArr(searchBar.value);
    setGifSize(e, gifArr);
})