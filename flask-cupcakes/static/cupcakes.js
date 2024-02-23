const BASE_URL = "http://127.0.0.1:5000/api"


// function to generate html for each cupcake- need to have flavor, size, and rating. should have a delete button next to it as well
function generateHTML(cupcake){
    return `<div class="cupcake">
    <h6>Flavor: ${cupcake.flavor} / Size: ${cupcake.size} / Rating: ${cupcake.rating}</h6>
    <img id="cupcake-image" src="${cupcake.image}">
    <button class="delete-btn" data-id=${cupcake.id}>Remove</button>
    </div>`
}

// function to get cupcake data from api and call generate html function on each cupcake- should load automatically with the page
async function displayCupcakes(){
    try{
        const res = await axios.get(`${BASE_URL}/cupcakes`);
        for (let cupcakeData of res.data.cupcakes){
            let cupcake = $(generateHTML(cupcakeData));
            $("#cupcake-list").append(cupcake)
        }
    } catch(error){
        console.error("Error fetching cupcakes:", error);
    }
} 
//add event listener on button when submitting form for a new cupcake
$("#cupcake-form").on("submit", async function(e){
    e.preventDefault();
    let flavor = $("#flavor").val()
    let size = $("#size").val()
    let rating = $("#rating").val()
    let image = $("#image").val()

    const res = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor, size, rating, image
    });

    let cupcake = $(generateHTML(res.data.cupcake));
    $("#cupcake-list").append(cupcake);
    $("#cupcake-form").trigger("reset");
});

//add event listener on delete button next to each cupcake
$("#cupcake-list").on("click", ".delete-btn", deleteCupcake)
    
async function  deleteCupcake(){
    const id = $(this).data('id')
    await axios.delete(`${BASE_URL}/cupcakes/${id}`)
    $(this).parent().remove()
};

displayCupcakes();

