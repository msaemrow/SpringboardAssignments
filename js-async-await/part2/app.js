const baseURL = "https://deckofcardsapi.com/api/deck"

//  PART 1
async function part1(){
    let res = await axios.get(`${baseURL}/new/draw`)
    let suit = res.data.cards[0].suit
    let value = res.data.cards[0].value
    console.log(`${value} of ${suit}`)
}

//  PART 2

const deck = {
    async init (){
        let res = await axios.get(`${baseURL}/new`)
        this.deckId = res.data.deck_id;
        console.log(this.deckId)
    },
    async shuffle(){
        let res = await axios.get(`${baseURL}/${this.deckId}/shuffle`)
        console.log(res.data.success)
    },
    async drawCard(){
        let res = await axios.get(`${baseURL}/${this.deckId}/draw`)
        let suit = res.data.cards[0].suit
        let value = res.data.cards[0].value
        console.log(`${value} of ${suit}`)
    }
};


// PART 3
const $deckBtn = $('#new-deck-btn')
const $drawBtn = $('#draw-card-btn')
const $clearBtn = $('#clear-btn')
const $cardDiv = $('#card-div')
let deckId = null;

async function newDeck (){
    let res = await axios.get(`${baseURL}/new/shuffle`)
    deckId = res.data.deck_id;
    console.log(deckId)
};

async function drawCard(){
    let res = await axios.get(`${baseURL}/${deckId}/draw`)
    let suit = res.data.cards[0].suit
    let value = res.data.cards[0].value
    console.log(`${value} of ${suit}`)
};
function onLoad(){
    $drawBtn.hide();
    $clearBtn.hide();
}

function clearScreen(){
    $cardDiv.empty();
}

$deckBtn.on('click', async function(){
    let res = await axios.get(`${baseURL}/new/shuffle`)
    deckId = res.data.deck_id;
    console.log(deckId);
    $drawBtn.show();
    $clearBtn.show();
    $deckBtn.hide();
})

$drawBtn.on('click', async function(){
    let res = await axios.get(`${baseURL}/${deckId}/draw`)
    let cardImage = res.data.cards[0].image;
    console.log(cardImage)
    let suit = res.data.cards[0].suit;
    let value = res.data.cards[0].value;
    let card = value + " of " + suit;
    let $image = 
        $('<img>',{
            src: cardImage
        });
    console.log($image);  
    $cardDiv.append($image);
    if (res.data.remaining == 0) $drawBtn.hide();
})

$clearBtn.on('click', function(){
    clearScreen();
    $deckBtn.show();
    onLoad();
})
onLoad();