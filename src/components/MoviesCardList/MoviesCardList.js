import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

  const { 
    cards, 
    isSavedMoviesPage } = props; 

  const [isSavedArray, setIsSavedArray] = useState(cards.map(() => false));
  const [visibleCardsCount, setVisibleCardsCount] = useState(getVisibleCardsCount());

  function handleSaveClick(index) {
    const updatedArray = [...isSavedArray];
    updatedArray[index] = !updatedArray[index];
    setIsSavedArray(updatedArray);
  };

  function getVisibleCardsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else if (screenWidth >= 320) {
      return 5;
    }
    return 0;
  };

  function handleResize() {
    setTimeout(() => {
      setVisibleCardsCount(getVisibleCardsCount());
    }, 200); // Задержка в 200 миллисекунд
  };

  useEffect(() => {
    setVisibleCardsCount(getVisibleCardsCount());
    setIsSavedArray(cards.map(() => false));
// Чтобы колбэк-функция слушателя не срабатывала слишком часто, например, 
//при изменении ширины экрана в отладчике, мы рекомендуем установить setTimeout 
// на вызов этой функции внутри слушателя "resize".
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const handleShowMoreClick = () => {
    if (visibleCardsCount < cards.length) {
      if (window.innerWidth >= 879) {
        setVisibleCardsCount((prevCount) => prevCount + 3);
      } else if (window.innerWidth >= 560) {
        setVisibleCardsCount((prevCount) => prevCount + 2);
      } else if (window.innerWidth >= 320) {
        setVisibleCardsCount((prevCount) => prevCount + 2);
      }
    }
  };

  const visibleCards = cards.slice(0, visibleCardsCount);

  return (
    <section className="elements">
      <ul className="elements__list">
        {visibleCards.map((card, index) => (
          <MoviesCard
            key={card.id}
            movieId={card.id}
            duration={card.duration}
            image={card.image.url}
            name={card.nameRU}
            trailerLink = {card.trailerLink}
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
