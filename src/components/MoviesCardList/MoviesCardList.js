import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

  const { cards } = props; 

  // const [isSaved, setIsSaved] = useState(false);

  // const handleSaveClick = () => {
  //   setIsSaved(!isSaved);
  // };

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
            // handleSaveClick={handleSaveClick}
            // isSaved={isSaved}
            handleSaveClick={() => handleSaveClick(index)}
            isSaved={isSavedArray[index]}
          />
        ))}
        
        
      </ul>
      {/* <button className="elements__more-btn">Ещё</button> */}
      {visibleCardsCount < cards.length && (
        <button className="elements__more-btn" onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>

  );
}

export default MoviesCardList;
