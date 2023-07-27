import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { getMoviesOnLocalStorage } from "../../utils/utils";
import {
  SCREEN_DESKTOP,
  SCREEN_TABLET,
  SCREEN_MOBILE,
  MOVIES_COUNT_DESKTOP,
  MOVIES_COUNT_TABLET,
  MOVIES_COUNT_MOBILE,
  MOVIES_ADDITIONAL_COUNT_DESKTOP,
  MOVIES_ADDITIONAL_COUNT_TABLET,
  MOVIES_ADDITIONAL_COUNT_MOBILE,
} from "../../utils/constants";

function MoviesCardList(props) {
  const { cards, isSavedMoviesPage, onDelete, onSave } = props;

  const [visibleCardsCount, setVisibleCardsCount] = useState(
    getVisibleCardsCount()
  );
  const [movies, setMovies] = useState(cards);
  const path = window.location.pathname;

  useEffect(() => {
    setMovies(cards);
  }, [cards]);

  const saveMovies = getMoviesOnLocalStorage();

  function getVisibleCardsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= SCREEN_DESKTOP) {
      return MOVIES_COUNT_DESKTOP;
    } else if (screenWidth >= SCREEN_TABLET) {
      return MOVIES_COUNT_TABLET;
    } else if (screenWidth >= SCREEN_MOBILE) {
      return MOVIES_COUNT_MOBILE;
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSaveMovie = (movie) => {
    onSave(movie).then(() => {
      const movieIndex = movies.findIndex(({ id }) => id === movie.id)
      setMovies([...movies.slice(0, movieIndex), movie, ...movies.slice(movieIndex +1)])
    })
  }

  const handleDeleteMovie = (movie) => {
    onDelete(movie).then(() => {
      setMovies((prev) => prev.filter((m) => m.movieId !== movie.movieId));
    });
  };

  const handleShowMoreClick = () => {
    if (visibleCardsCount < movies.length) {
      if (window.innerWidth >= SCREEN_DESKTOP) {
        setVisibleCardsCount(
          (prevCount) => prevCount + MOVIES_ADDITIONAL_COUNT_DESKTOP
        );
      } else if (window.innerWidth >= SCREEN_TABLET) {
        setVisibleCardsCount(
          (prevCount) => prevCount + MOVIES_ADDITIONAL_COUNT_TABLET
        );
      } else if (window.innerWidth >= SCREEN_MOBILE) {
        setVisibleCardsCount(
          (prevCount) => prevCount + MOVIES_ADDITIONAL_COUNT_MOBILE
        );
      }
    }
  };

  const visibleCards =
    path === "/saved-movies" ? movies : movies.slice(0, visibleCardsCount);

  const hasIsSave = (card) => {
    return saveMovies.some((m) => m.movieId === card.id);
  };

  const updateMovie = (card) => {
    const film = saveMovies.find((m) => m.movieId === card.id);
    return film ? { ...card, _id: film._id } : card;
  };

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
              // onSave={onSave}
              onSave={handleSaveMovie}
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
