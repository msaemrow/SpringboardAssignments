import React from "react";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import useAxios from './hooks/useAxios'
import { formatPlayingCardData } from "./formatting";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function PlayingCardList() {
  const [cards, addCard, clearCards] = useAxios('https://deckofcardsapi.com/api/deck/new/draw/', formatPlayingCardData, "PlayingCards")
  
  const handleAddCard = async() => {
    await addCard('');
  }

  const handleClearCards = () => {
    clearCards();
  }

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={handleAddCard}>Add a playing card!</button>
        <button onClick={handleClearCards}>Clear all playing cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

export default PlayingCardList;
