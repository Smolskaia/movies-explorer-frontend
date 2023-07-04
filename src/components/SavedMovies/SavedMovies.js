import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { savedMoviesList } from '../../utils/constants';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function SavedMovies() {

  return (
    <section className="saved-movies">
      <BurgerMenu />
      <Header
        isLoggedIn={true}
      />
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