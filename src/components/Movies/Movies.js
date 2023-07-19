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
// import fail from "../../images/popup-fail-reg.svg";

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

  // // закрытие информационного попапа
  // function handleCloseInfoTooltip() {
  //   setInfoTooltipOpen(false);
  // }

  function filterMovies(allMovies, searchMovieText, isShortMovies) {
      // Сохранение данных в локальное хранилище
    localStorage.setItem("searchMovieText", searchMovieText);
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
    
    // фильтрация массива с фильмами
    const filteredMovies = allMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(searchMovieText.toLowerCase())
    );
    
    // поиск короткометражек в полученном массиве
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
    
    // сет фильтрованных фильмов
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
          // setFilteredMovies(filteredMovies);
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
            />
          )}
          {filteredMovies.length === 0 && searchMovieText !== "" && (
            <p>Ничего не найдено</p>
          )}
          {searchMovieText === "" && <p>Введите ключевое слово для поиска</p>}
          {/* <InfoTooltip
            image={infoTooltipImage}
            title={infoTooltipMessage}
            isPopupOpen={infoTooltipOpen}
            onClose={handleCloseInfoTooltip}
          /> */}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
