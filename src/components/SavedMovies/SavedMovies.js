import React, { useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getMoviesOnLocalStorage } from '../../utils/utils';
import { deleteMoviesOnLocalStorage } from '../../utils/utils';
import apiMain from "../../utils/MainApi";


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
      .filter( movie => isShortMovies ? movie.duration <= 40 : movie)
      .filter( movie => searchMovieText && movie ? movie.nameRU.toLowerCase().includes(searchMovieText.toLowerCase()) : movie)
  }


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
          <MoviesCardList
            cards={filtredMovies(savedMovies)}
            isSavedMoviesPage={true}
            onDelete={handleDeleteMovie}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
