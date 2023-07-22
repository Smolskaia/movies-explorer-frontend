import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {

  const { 
    cards, 
    isSavedMoviesPage,
    savedMovies,
    onDelete,
    onSave,
   } = props; 

  // const [isSavedArray, setIsSavedArray] = useState(cards.map(() => false));
  const [visibleCardsCount, setVisibleCardsCount] = useState(getVisibleCardsCount());

  // function handleSaveClick(index) {
  //   const updatedArray = [...isSavedArray];
  //   updatedArray[index] = !updatedArray[index];
  //   setIsSavedArray(updatedArray);
  // };

  function getVisibleCardsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 879) {
      return 12;
    } else if (screenWidth >= 560) {
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
    // Чтобы колбэк-функция слушателя не срабатывала слишком часто, например, 
    //при изменении ширины экрана в отладчике, устанавливаем setTimeout 
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
        {visibleCards.map((card) => (
          <MoviesCard
            key={card.id}
            card={card}
            // isSaved={savedMovies.some((item) => {
            //   return item.movieId === card.movieId;
            // })}
            isSavedMoviesPage={isSavedMoviesPage}
            savedMovies={savedMovies}
            onDelete={onDelete} // Прокидываем onDelete всегда
            onSave={!isSavedMoviesPage ? onSave : undefined} // Прокидываем onSave на всех страницах кроме SavedMovies
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
