import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { cardsList } from '../../utils/constants';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Movies() {

  return (
    <section className="movies">
      <BurgerMenu />
      <Header
        isLoggedIn={true}
      />
      <main>
        <SearchFilmForm/>
        <MoviesCardList
        cards={cardsList}
        isSavedMoviesPage={false}
        />
      </main>
      <Footer />
    </section>
  );
}

export default Movies;