let movieId = 0;
const movieArray = [];

//submit button event listener
$("#rating-form").on('submit', function(e){
    e.preventDefault(e);
    let title = $("#title").val().toLowerCase();
    let rating = $("#rating").val();
    let movieData = {movieId, title, rating};
    movieId++;   
    movieArray.push(movieData);
    appendMovieData(movieData); 
    resetValues();
});


//delete button event listenter
$("#table-body").on('click', '.deleteBtn', function(e){
    e.preventDefault();
    deleteMovieData(e);
    $(e.target).closest('tr').remove();
})

//event listener to sort movies by rating or title
$('.sortBtn').on('click', function(e){
    let sortBy = $(e.target).attr('id');
    console.log(sortBy);
    let dir = $(e.target).hasClass('up') ? "up" : "down";
    console.log(dir);
    let sortedMovies = sortMovieList(movieArray, sortBy, dir);

    $('#table-body').empty();

    for(let movie of sortedMovies){
        appendMovieData(movie);
    }

    $(e.target).toggleClass('up');
    $(e.target).toggleClass('down');
})

function sortMovieList(arr, sortBy, dir){
    return arr.sort(function(a, b) {
        // since rating is a number, we have to convert these strings to numbers
        if (sortBy === "rating") {
          a[sortBy] = +a[sortBy];
          b[sortBy] = +b[sortBy];
          console.log(a[sortBy])
        }
        if (a[sortBy] > b[sortBy]) {
          return dir === "down" ? 1 : -1;
        } else if (b[sortBy] > a[sortBy]) {
          return dir === "down" ? -1 : 1;
        }
        return 0;
    
    });
}

//resets input values- called in submit button listner
function resetValues(){
    $("#title").val('');
    $("#rating").val(1);
}

//appends movie data to ratings table- called in submit button listner
function appendMovieData(movieObj){
    let movieToAppend = 
    `<tr>
        <td>${movieObj.title}</td>
        <td class="ratingTd">${movieObj.rating}</td>
        <td><button class='deleteBtn' data-delete-Id=${movieObj.movieId}>RemoveRating</button></td>
    <tr>`
    console.log(movieObj);
    $("#table-body").append(movieToAppend);
}

//deletes selected movie data from ratings table- called in delete button listener
function deleteMovieData(eventObj){
    let removeIndex = movieArray.findIndex((movie) => movie.movieId === +$(eventObj.target).data("deleteId"))
    movieArray.splice(removeIndex, 1);
}
