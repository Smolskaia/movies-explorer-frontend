import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { cardsList } from '../../utils/constants';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Preloader from "../Preloader/Preloader";

function Movies() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитируем загрузку данных в течение 2 секунд
    setTimeout(() => {
      setIsLoading(false); // прелоадер в false через 2 секунды
    }, 2000);
  }, []);

  return (
    <section className="movies">
      <BurgerMenu />
      <Header
        isLoggedIn={true}
      />
      <main>
        <SearchFilmForm/>
        {isLoading ? <Preloader /> : null}
        <MoviesCardList
          cards={cardsList}
          isSavedMoviesPage={false}
        />
        />
      </main>
      <Footer />
    </section>
  );
}

export default Movies;