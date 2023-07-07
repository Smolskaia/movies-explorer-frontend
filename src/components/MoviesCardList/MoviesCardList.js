import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

  const { 
    cards, 
    isSavedMoviesPage } = props; 

  const [isSavedArray, setIsSavedArray] = useState(cards.map(() => false));
  const [visibleCardsCount, setVisibleCardsCount] = useState(12);

  const handleSaveClick = (index) => {
    const updatedArray = [...isSavedArray];
    updatedArray[index] = !updatedArray[index];
    setIsSavedArray(updatedArray);
  };

  const handleShowMoreClick = () => {
    setVisibleCardsCount((prevCount) => prevCount + 12);
  };

  const visibleCards = cards.slice(0, visibleCardsCount);

  return (
    <section className="elements">
      <ul className="elements__list">
        {visibleCards.map((card, index) => (
          <MoviesCard
            key={card.movieId}
            movieId={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            handleSaveClick={() => handleSaveClick(index)}
            isSaved={isSavedArray[index]}
            isSavedMoviesPage={isSavedMoviesPage}
          />
        ))}
      </ul>
      {visibleCardsCount < cards.length && (
        <button className="elements__more-btn" onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>

  );
}

export default MoviesCardList;
