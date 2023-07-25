import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getMoviesOnLocalStorage } from '../../utils/utils';
import { deleteMoviesOnLocalStorage } from '../../utils/utils';
import apiMain from "../../utils/MainApi";


function SavedMovies(props) {

  const savedMovies = getMoviesOnLocalStorage();
  // console.log("savedMovies:", savedMovies);
  // const [filteredMovies, setFilteredMovies] = useState([savedMovies]);
  // // состояние чекбокса.
  // const [isShortMovies, setIsShortMovies] = useState(false);
  // // состояние поисковой строки
  // const [searchMovieText, setSearchMovieText] = useState("");

  function handleDeleteMovie(movieData) {
    console.log('movieData =>', movieData)
    apiMain
      .deleteSavedMovie({ id: movieData._id })
      .then(() => {
        console.log('after fetch')
        deleteMoviesOnLocalStorage(movieData)
      })
      .catch((err) => {
        console.log("Фильм с указанным movieId не найден.", err);
      });
  }

  

  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="saved-movies">
          <SearchFilmForm />
          <MoviesCardList
            cards={savedMovies}
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
