import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { savedMoviesList } from "../../utils/constants";

function SavedMovies() {
  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="saved-movies">
          <SearchFilmForm />
          <MoviesCardList
            cards={savedMoviesList}
            isSavedMoviesPage={true}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
