import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { getMoviesOnLocalStorage } from '../../utils/utils'

function MoviesCardList(props) {
  const { cards, isSavedMoviesPage, onDelete, onSave } = props;

  const [visibleCardsCount, setVisibleCardsCount] = useState(
    getVisibleCardsCount()
  );
  const [movies, setMovies] = useState(cards);
  const path = window.location.pathname;

  useEffect(() => {
    setMovies(cards)
  }, [cards])

  const saveMovies = getMoviesOnLocalStorage();

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
  }

  function handleResize() {
    setTimeout(() => {
      setVisibleCardsCount(getVisibleCardsCount());
    }, 200); // Задержка в 200 миллисекунд
  }

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

  const handleDeleteMovie = (movie) => {
    setMovies(prev => prev.filter( m => m.movieId !== movie.movieId))
    onDelete(movie);
  }

  const handleShowMoreClick = () => {
    if (visibleCardsCount < movies.length) {
      if (window.innerWidth >= 879) {
        setVisibleCardsCount((prevCount) => prevCount + 3);
      } else if (window.innerWidth >= 560) {
        setVisibleCardsCount((prevCount) => prevCount + 2);
      } else if (window.innerWidth >= 320) {
        setVisibleCardsCount((prevCount) => prevCount + 2);
      }
    }
  };

  const visibleCards = path === "/saved-movies" ? movies : movies.slice(0, visibleCardsCount);
  // const visibleCards = movies.slice(0, visibleCardsCount);

  const hasIsSave = (card) => {
    return saveMovies.some( m => m.movieId === card.id)
  }

  const updateMovie = (card) => {
    const film = saveMovies.find( m => m.movieId === card.id)
    return film  ? {...card, _id: film._id} : card
  }

  return (
    <section className="elements">
      {path === "/saved-movies" ? (
        <ul className="elements__list">
          {visibleCards.map((card) => (
            <MoviesCard
              key={`saved_movie_${card._id}`}
              card={card}
              isSavedMoviesPage={isSavedMoviesPage}
              onDelete={handleDeleteMovie}
            />
          ))}
        </ul>
      ) : (
        <ul className="elements__list">
          {visibleCards.map((card) => (
            <MoviesCard
              key={card.id}
              card={updateMovie(card)}
              isSavedMoviesPage={isSavedMoviesPage}
              onDelete={onDelete}
              onSave={onSave}
              isSaved={hasIsSave(card)}
            />
          ))}
        </ul>
      )}

      {path !== "/saved-movies" && visibleCardsCount < cards.length && (
        <button
          className="elements__more-btn"
          onClick={handleShowMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
