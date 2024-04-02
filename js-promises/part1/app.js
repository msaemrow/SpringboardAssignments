const BASE_URL = "http://numbersapi.com";
const favNumber = 99;
const min = 11;
const max = 17;
//PART 1
//#1
$.getJSON(`${BASE_URL}/${favNumber}?json`)
.then(data => {
    console.log(data)
})
.fail(err => {
    console.log(err)
})

//#2
$.getJSON(`${BASE_URL}/${min}..${max}?json`)
.then(data => {
    console.log(data)
})
.fail(err => {
    console.log(err)
})


//#3
let numbersPromises = [];
for (let i=0; i<5; i++){
    numbersPromises.push(
        $.getJSON(`${BASE_URL}/${favNumber}?json`)
    );
}

Promise.all(numbersPromises)
    .then(nubmerFact => {
        nubmerFact.forEach(fact => $("body").append(`<h3>${fact.text}</h3>`
        ));
    });
    

