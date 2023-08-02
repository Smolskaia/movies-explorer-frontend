import React, { useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getMoviesOnLocalStorage } from '../../utils/utils';
import { deleteMoviesOnLocalStorage } from '../../utils/utils';
import apiMain from "../../utils/MainApi";
import { SHORTS_DURATION } from "../../utils/constants";


function SavedMovies({ loggedIn }) {

  const savedMovies = getMoviesOnLocalStorage();
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchMovieText, setSearchMovieText] = useState("");

  function handleSubmit(value) {
    setSearchMovieText(value)
  }

  async function handleDeleteMovie(movieData) {
    try {
      await apiMain.deleteSavedMovie({ id: movieData._id })
      deleteMoviesOnLocalStorage(movieData)
    } catch (error) {
      console.log("Фильм с указанным movieId не найден.", error);
    }
  }

  const filtredMovies = (savedMovies) => {
    return savedMovies
      .filter( movie => isShortMovies ? movie.duration <= SHORTS_DURATION : movie)
      .filter( movie => searchMovieText && movie ? movie.nameRU.toLowerCase().includes(searchMovieText.toLowerCase()) : movie)
  }

  const filteredMoviesList = filtredMovies(savedMovies);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <section className="saved-movies">
          <SearchFilmForm 
            onSubmit={handleSubmit}
            isShortMovies={isShortMovies}
            checkboxToggle={() => setIsShortMovies(!isShortMovies)}
          />
          {filteredMoviesList.length > 0 ? (
            <MoviesCardList
              cards={filteredMoviesList}
              isSavedMoviesPage={true}
              onDelete={handleDeleteMovie}
            />
          ) : (
            <p>Ничего не найдено</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
