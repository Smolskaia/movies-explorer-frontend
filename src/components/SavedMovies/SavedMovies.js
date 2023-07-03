import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { savedMoviesList } from '../../utils/constants';

function SavedMovies() {

  return (
    <section className="movies">
      <Header
        isLoggedIn={true}
       /* handleMenuClick={handleMenuClick} */ />
      <main>
        <SearchFilmForm/>
        <MoviesCardList
        cards={savedMoviesList}
        isSavedMoviesPage={true}
        />
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;