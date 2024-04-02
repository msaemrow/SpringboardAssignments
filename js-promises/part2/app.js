$(function(){
let BASE_URL = "https://deckofcardsapi.com/api/deck"


// example api call: https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

// PART 1
$.getJSON(`${BASE_URL}/new/draw/`)
    .then(data =>{
        console.log(`PART 1 ${data.cards[0].value} of ${data.cards[0].suit}`)
    })

// PART 2
let firstCard = null;
$.getJSON(`${BASE_URL}/new/draw/`)
    .then(data => {
        firstCard=data.cards[0];
        let deckID = data.deck_id;
        return $.getJSON(`${BASE_URL}/${deckID}/draw/`);
    })
    .then(data =>{
        let secondCard = data.cards[0]
        console.log(`PART 2 ${firstCard.value} of ${firstCard.suit}`)
        console.log(`PART 2 ${secondCard.value} of ${secondCard.suit}`)
    })

    //PART 3
    const $btn = $('.btn')
    const $cardDiv = $('#card-div')
    let deckId = null

    $.getJSON(`${BASE_URL}/new/shuffle/`)
    .then(data =>{
        deckId = data.deck_id
        $btn.show()
    });

    $btn.on('click', function(){
        $.getJSON(`${BASE_URL}/${deckId}/draw/`)
        .then(data =>{
            let cardImage = data.cards[0].image;
            console.log(cardImage)
            let $image = 
                $('<img>',{
                    src: cardImage
                });
            $cardDiv.append($image)
            if (data.remaining == 0) $btn.remove()
        });
    });
});