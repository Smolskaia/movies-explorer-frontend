import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi";

function Movies(props) {
  const { logout, onSave, onDelete } = props;
  // состояние фильмов
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // состояние чекбокса.
  const [isShortMovies, setIsShortMovies] = useState(false);
  // состояние поисковой строки
  const [searchMovieText, setSearchMovieText] = useState("");
  // состояние загрузки
  const [isLoading, setIsLoading] = useState(true);


  function filterMovies(allMovies, searchMovieText, isShortMovies) {
    if (searchMovieText === "") {
      localStorage.setItem("searchMovieText", searchMovieText);
      localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
      localStorage.setItem("filteredMovies", JSON.stringify([]));
      return [];
    }
  
    localStorage.setItem("searchMovieText", searchMovieText);
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
  
    const filteredMovies = allMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(searchMovieText.toLowerCase())
    );
  
    if (isShortMovies) {
      const filteredShortMovies = filteredMovies.filter(
        (item) => item.duration <= 40
      );
      localStorage.setItem("filteredMovies", JSON.stringify(filteredShortMovies));
      return filteredShortMovies;
    } else {
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      return filteredMovies;
    }
  }

  // переключение чекбокса
  function checkboxToggle(event) {
    const newValue = event.target.checked;
    setIsShortMovies(newValue);
    const filteredMovies = filterMovies(
      allMovies,
      searchMovieText,
      newValue
    );
    setFilteredMovies(filteredMovies);
    localStorage.setItem("isShortMovies", String(newValue));
  }

  // нажатие кнопки поика
  function handleSearchBtn() {
    // вызов функции фильтрации
    const filteredMovies = filterMovies(
      allMovies,
      searchMovieText,
      isShortMovies
    );
    // сет фильтрованных фильмов
    setFilteredMovies(filteredMovies);
  }

  useEffect(() => {
    const query = localStorage.getItem("searchMovieText");
    const storageMovies = localStorage.getItem("filteredMovies");
    const storageShortMovies = localStorage.getItem("isShortMovies");
    const storageAllMovies = localStorage.getItem("allMovies");
    if (query && storageMovies && storageShortMovies && storageAllMovies) {
      setSearchMovieText(query);
      setFilteredMovies(JSON.parse(storageMovies));
      setIsShortMovies(storageShortMovies === "true");
      setIsLoading(false);
      setAllMovies(JSON.parse(storageAllMovies));
    } else {
      setIsLoading(true);
      // Вызываем метод для загрузки фильмов
      apiMovies
        .getInitialMovies()
        .then((data) => {
          localStorage.setItem("allMovies", JSON.stringify(data));
          setAllMovies(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Header
        isLoggedIn={true}
        logout={logout}
      />
      <main>
        <section className="movies">
          <SearchFilmForm
            searchMovieText={searchMovieText}
            setSearchMovieText={setSearchMovieText}
            onSubmit={handleSearchBtn}
            isShortMovies={isShortMovies}
            checkboxToggle={checkboxToggle}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={filteredMovies}
              isSavedMoviesPage={false}
              onSave={onSave}
              onDelete={onDelete}
            />
          )}
          {filteredMovies.length === 0 && searchMovieText !== "" && (
            <p>Ничего не найдено</p>
          )}
          {searchMovieText === "" && <p>Введите ключевое слово для поиска</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
