import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchFilmForm from '../SearchFilmForm/SearchFilmForm';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <section className="movies">
      <Header
        isLoggedIn={true}
       /* handleMenuClick={handleMenuClick} */ />
      <main>
         <SearchFilmForm/>
        {/*<MoviesCardList
          isLiked={isLiked}
          handleLikeClick={handleLikeClick} /> */}
      </main>
      <Footer />
    </section>
  );
}

export default Movies;