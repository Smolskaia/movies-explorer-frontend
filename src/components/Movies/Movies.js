import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
// import { cardsList } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi"
import InfoTooltip from "../InfoTooltip/InfoTooltip"; // Импорт компонента InfoTooltip
import fail from "../../images/popup-fail-reg.svg";

function Movies(props) {
  const { isPopupOpen } = props;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // состояние информационного попапа
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Состояние для открытия/закрытия InfoTooltip
  const [infoTooltipImage, setInfoTooltipImage] = useState(""); // Значение для пропса image
  const [infoTooltipMessage, setInfoTooltipMessage] = useState(""); // Значение для пропса title
  
  const [searchMovieText, setSearchMovieText] = useState("");

  const [shortMovies, setShortMovies] = useState(false);
  
  // закрытие информационного попапа
  function handleCloseInfoTooltip() {
    setInfoTooltipOpen(false);
  };

  // нажатие кнопки поика
  function handleSearchBtn() {
    if (searchMovieText.trim() === '') { 
      setInfoTooltipImage(fail);
      setInfoTooltipMessage('Нужно ввести ключевое слово');
      setInfoTooltipOpen(true); // Открываем InfoTooltip
      return;
  }
    setIsLoading(true);
    setInfoTooltipOpen(false);
    /* setItem принимает два аргумента: ключ и его значение. 
    Значением может быть только строка. Потому метод setItem 
    приведёт любой аргумент к строке.Для перевода объекта в 
    строку пользуйтесь методом JSON.stringify. Если просто 
    передать методу setItem объект, он будет приведён к строке 
    встроенным методом toString, результатом работы которого 
    будет [Object object] для любого объекта. */
    localStorage.setItem('searchMovieText', searchMovieText);
    // Вызываем метод для загрузки фильмов
    apiMovies.getInitialMovies()
    .then((moviesArr) => {
      // фильтрация массива с фильмами
      const filteredMovies = moviesArr.filter(item => item.nameRU.toLowerCase().includes(searchMovieText));
      // фильтрация массива с короткометражками
      const filteredShortMovies = shortMovies ? filteredMovies.filter((item) => item.duration <= 40) : filteredMovies;

      setMovies(filteredShortMovies);
      localStorage.setItem('moviesData', JSON.stringify(filteredShortMovies));
        if (filteredShortMovies.length === 0) {
          setInfoTooltipImage(fail);
          setInfoTooltipMessage('Ничего не найдено');
          setInfoTooltipOpen(true); // Открываем InfoTooltip
        }
      // setIsLoading(false);
    })
    .catch(() => {
      setInfoTooltipImage(fail);
      setInfoTooltipMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setInfoTooltipOpen(true); // Открываем InfoTooltip
    })
    .finally(() => setIsLoading(false))
};

useEffect(() => {
  const query = localStorage.getItem('searchMovieText');
  const storageMovies = localStorage.getItem('moviesData');
  const storageShortMovies = localStorage.getItem('shortMoviesData');
  if (query) {
    setSearchMovieText(query);
  }
  if (storageMovies) {
    setMovies(JSON.parse(storageMovies));

  }
  if (storageShortMovies) {
    setShortMovies(storageShortMovies === 'true');
  }
}, [])

// рендеринг всех фильмов
// useEffect(() => {
//   // Вызываем метод для загрузки фильмов
//   apiMovies.getInitialMovies()
//     .then((data) => {
//       setMovies(data);
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       console.log(error);
//       setIsLoading(false);
//     });
// }, []);

  useEffect(() => {
    // Имитируем загрузку данных в течение 2 секунд
    setTimeout(() => {
      setIsLoading(false); // прелоадер в false через 2 секунды
    }, 2000);
  }, []);


  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="movies">
          <SearchFilmForm 
          searchMovieText={searchMovieText}
          setSearchMovieText={setSearchMovieText}
          onSubmit ={handleSearchBtn}
          shortMovies={shortMovies}
          setShortMovies={setShortMovies}
          />
          {isLoading ? <Preloader /> : (
            <MoviesCardList
              cards={movies}
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
