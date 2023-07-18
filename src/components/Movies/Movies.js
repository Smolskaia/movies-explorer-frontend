import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
// import { cardsList } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip"; // Импорт компонента InfoTooltip
import fail from "../../images/popup-fail-reg.svg";

function Movies(props) {
  const { logout } = props;
  // состояние фильмов
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = useState([]);
  // состояние чекбокса.
  const [isShortMovies, setIsShortMovies] = useState(false);
  // состояние поисковой строки
  const [searchMovieText, setSearchMovieText] = useState("");
  // состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

  // состояние информационного попапа
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Состояние для открытия/закрытия InfoTooltip
  const [infoTooltipImage, setInfoTooltipImage] = useState(""); // Значение для пропса image
  const [infoTooltipMessage, setInfoTooltipMessage] = useState(""); // Значение для пропса title

  // закрытие информационного попапа
  function handleCloseInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  // нажатие кнопки поика
  function handleSearchBtn() {
    if (searchMovieText.trim() === "") {
      setInfoTooltipImage(fail);
      setInfoTooltipMessage("Нужно ввести ключевое слово");
      setInfoTooltipOpen(true); // Открываем InfoTooltip
      return;
    }
      // вызов функции фильтрации
      const filteredMovies = filterMovies(
        allMovies,
        isShortMovies,
        searchMovieText
      );
      // сет фильтрованных фильмов
      setFilteredMovies(filteredMovies);
    }
  
  useEffect(() => {
    const query = localStorage.getItem("searchMovieText");
    const storageMovies = localStorage.getItem("moviesData");
    const storageShortMovies = localStorage.getItem("shortMoviesData");
    if (query) {
      setSearchMovieText(query);
    }
    if (storageMovies) {
      setAllMovies(JSON.parse(storageMovies));
    }
    if (storageShortMovies) {
      setIsShortMovies(storageShortMovies === "true");
    }
  }, []);

  // рендеринг фильмов
  useEffect(() => {
    setIsLoading(true);
    // Вызываем метод для загрузки фильмов
    apiMovies
      .getInitialMovies()
      .then((data) => {
        const filteredMovies = filterMovies(data, searchMovieText, isShortMovies);
        setFilteredMovies(filteredMovies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [searchMovieText, isShortMovies]);

  function filterMovies(allMovies, searchMovieText, isShortMovies) {
    // фильтрация массива с фильмами
    const filteredMovies = allMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(searchMovieText)
    );
    // поиск короткометражек в полученном массиве
    if (isShortMovies) {
      const filteredShortMovies = filteredMovies.filter(
        (item) => item.duration <= 40
      );
      setAllMovies(filteredShortMovies);;
    } else {
      setAllMovies(filteredMovies);
    }
  }

  useEffect(() => {
    // Имитируем загрузку данных в течение 2 секунд
    setTimeout(() => {
      setIsLoading(false); // прелоадер в false через 2 секунды
    }, 2000);
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
            setIsShortMovies={setIsShortMovies}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={allMovies}
              isSavedMoviesPage={false}
            />
          )}
          <InfoTooltip
            image={infoTooltipImage}
            title={infoTooltipMessage}
            isPopupOpen={infoTooltipOpen}
            onClose={handleCloseInfoTooltip}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
