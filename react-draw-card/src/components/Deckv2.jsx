import React, { useState, useEffect, useRef } from "react";
import Card from "./Card"
import axios from "axios"
import "../css/Deck.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck"

function Deckv2(){
    const [deckId, setDeckId] = useState(null)
    const [cardPile, setCardPile]  = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const drawIntervalRef = useRef(null)

    useEffect(() => {
        async function drawDeck(){
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeckId(res.data.deck_id)
        }
        drawDeck();
    }, [])


    function  resetDeck(){
        setCardPile([]);
        setIsDrawing(false);
    }
    const drawCard = () => {
        if(isDrawing)  {
            clearInterval(drawIntervalRef.current);
            setIsDrawing(false);
            return;
        }

        setIsDrawing(true);
        drawIntervalRef.current = setInterval(async () => {
            try{
                const res = await axios.get(`${BASE_URL}/${deckId}/draw`)
                const card = res.data.cards[0];
                if(!card){
                    clearInterval(drawIntervalRef.current);
                    setIsDrawing(false);
                    setIsShuffling(true);
                    await axios.get(`${BASE_URL}/${deckId}/shuffle`);
                    setIsShuffling(false);
                    alert("Game Over. Re-shuffle deck");
                    resetDeck();
                    return;
                }
                setCardPile(pile => [
                    ...pile,
                    {
                        id: card.code,
                        name: card.value + " of " + card.suit,
                        image: card.image
                    },
                ]);
            } catch(error){
                alert(error);
                clearInterval(drawIntervalRef.current);
                setIsDrawing(false);
            }
        }, 1000);
    };

    return (
        <div className="Deck">
            {!isShuffling && (
            <div>
                <button className="Deck-shuffle-btn" onClick={drawCard}>
                    {isDrawing ? "Stop Drawing" : "Start Drawing"}
                </button>
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

export default Deckv2;