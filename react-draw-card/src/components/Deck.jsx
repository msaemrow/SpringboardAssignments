import React, { useState, useEffect, useRef } from "react";
import Card from "./Card"
import axios from "axios"
import "../css/Deck.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck"

function Deck(){
    const [deckId, setDeckId] = useState(null)
    const [cardPile, setCardPile]  = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);

    useEffect(() => {
        async function drawDeck(){
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeckId(res.data.deck_id)
        }
        drawDeck();
    }, [])

    async function drawCard(){
        try{
            const res = await axios.get(`${BASE_URL}/${deckId}/draw`)
            console.log(res.data.remaining)

            const card = res.data.cards[0];

            setCardPile(pile => [
                ...pile,
                {
                    id: card.code,
                    name: card.value + " of " + card.suit,
                    image: card.image
                },
            ]);
            if(res.data.remaining === 0) {
                setIsDeckEmpty(true);
                console.log(isDeckEmpty);
                setTimeout(()=>{
                    alert("All cards have been drawn. Shuffle deck")
                }, 500);
            }
        } catch(error){
            alert(error);
        } 
    }

    async function shuffleDeck(){
        setIsShuffling(true)
        setIsDeckEmpty(false);
        try{
            await axios.get(`${BASE_URL}/${deckId}/shuffle`);
            setCardPile([]);
            setIsShuffling(false);
        } catch(error){
            alert(error)
        }
    }

    return (
        <div className="Deck">
            {!isShuffling && (
            <div>
                <button className="Deck-shuffle-btn" onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
                <button className="Deck-draw-btn" onClick={drawCard} disabled={isDeckEmpty}>Draw Card</button>
            </div>
            )}
            {isShuffling && (
                <h3 className="Deck-shuffle-msg">Shuffling Deck</h3>
            )}
            <div className="Deck-card-pile">
                {cardPile.map((card, index) => (
                    <Card key={index} value={card.name} image={card.image} />
                ))}
            </div>
        </div>
    );
}

export default Deck;