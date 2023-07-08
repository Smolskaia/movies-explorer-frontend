import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchFilmForm from "../SearchFilmForm/SearchFilmForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { cardsList } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";

import InfoTooltip from "../InfoTooltip/InfoTooltip"; // Импорт компонента InfoTooltip
import fail from "../../images/popup-fail-reg.svg";
import success from "../../images/popup-success-reg.svg";

function Movies(props) {
  const { isPopupOpen } = props;
  const [isLoading, setIsLoading] = useState(true);

  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Состояние для открытия/закрытия InfoTooltip
  const [infoTooltipImage, setInfoTooltipImage] = useState(""); // Значение для пропса image
  const [infoTooltipTitle, setInfoTooltipTitle] = useState(""); // Значение для пропса title

  useEffect(() => {
    // Имитируем загрузку данных в течение 2 секунд
    setTimeout(() => {
      setIsLoading(false); // прелоадер в false через 2 секунды
    }, 2000);
  }, []);

  // закрытие информационного попапа
  const handleCloseInfoTooltip = () => {
    setInfoTooltipOpen(false);
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="movies">
          <SearchFilmForm />
          {isLoading ? <Preloader /> : null}
          <MoviesCardList
            cards={cardsList}
            isSavedMoviesPage={false}
          />
          <InfoTooltip
          image={fail}
          title={"Нужно ввести ключевое слово"}
          isOpen={infoTooltipOpen}
          onClose={handleCloseInfoTooltip}
        />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
