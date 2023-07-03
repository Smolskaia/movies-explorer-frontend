import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { cardsList } from '../../utils/constants';

function Movies(props) {

  const { cards, isSavedMoviesPage} = props;


  return (
    <section className="movies">
      <Header
        isLoggedIn={true}
       /* handleMenuClick={handleMenuClick} */ />
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