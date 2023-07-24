import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const getMoviesOnLocalStorage = () => {
  const data = localStorage.getItem("savedMovies")

  if (!data) {
    return []
  }
  const movies = JSON.parse(data);

  return movies
}

function SavedMovies(props) {
  const { onDelete } = props;

  const savedMovies = getMoviesOnLocalStorage();
  console.log("savedMovies:", savedMovies);

  // const [filteredMovies, setFilteredMovies] = useState([savedMovies]);
  // // состояние чекбокса.
  // const [isShortMovies, setIsShortMovies] = useState(false);
  // // состояние поисковой строки
  // const [searchMovieText, setSearchMovieText] = useState("");

  

  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="saved-movies">
          <SearchFilmForm />
          <MoviesCardList
            cards={savedMovies}
            isSavedMoviesPage={true}
            onDelete={onDelete}
            savedMovies={savedMovies}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
