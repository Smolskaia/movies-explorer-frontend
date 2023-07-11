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

  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Состояние для открытия/закрытия InfoTooltip
  const [infoTooltipImage, setInfoTooltipImage] = useState(""); // Значение для пропса image
  const [infoTooltipMessage, setInfoTooltipMessage] = useState(""); // Значение для пропса title
  const [searchMovieText, setSearchMovieText] = useState("");

  
  
  // закрытие информационного попапа
  function handleCloseInfoTooltip() {
    setInfoTooltipOpen(false);
  };

  // нажатие кнопки поика, если запрос - пустая строка
  function handleSearchBtn() {
    if (searchMovieText.trim() === '') {
      setInfoTooltipImage(fail);
      setInfoTooltipMessage('Нужно ввести ключевое слово');
      setInfoTooltipOpen(true); // Открываем InfoTooltip
      return;
  }
}

useEffect(() => {
  // Вызываем метод для загрузки фильмов
  apiMovies.getInitialMovies()
    .then((data) => {
      setMovies(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
}, []);

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
