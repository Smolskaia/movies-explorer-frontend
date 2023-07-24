import React, { useState, useEffect } from "react";
import "./MoviesCard.css";
import { formatDuration } from "../../utils/utils";

function MoviesCard(props) {
  const {
    onSave,
    onDelete,
    isSaved,
    isSavedMoviesPage, // определяет, находится ли компонент на странице сохраненных фильмов (true) или на странице всех фильмов (false)
    card,
    savedMovies,
  } = props;

  const [isSaveBtnActive, setIsSaveBtnActive] = useState(
    localStorage.getItem(card.id) === "true" ? true : false
  );
  // При изменении состояния кнопки сохраняем его в локальное хранилище
  useEffect(() => {
    localStorage.setItem(card.id, isSaveBtnActive.toString());
  }, [card.id, isSaveBtnActive]);
  
  // console.log("card", card);

  function handleButtonClick() {
    console.log("isSaved", isSaved);
    if (isSaved) {
      // Если фильм уже сохранен, вызываем функцию onDelete для удаления фильма из списка сохраненных
      onDelete(savedMovies.find((m) => m.movieId === card.id));
      console.log(card.id);
    } else {
      // Если фильм еще не сохранен, вызываем функцию onSave для добавления фильма в список сохраненных
      onSave(card);
      setIsSaveBtnActive(!isSaveBtnActive);
    }
  }

  function handleDeleteButtonClick() {
    onDelete(card);
  }

  const saveButtonClassName = `${
    isSaveBtnActive ? "card__save-btn_active" : "card__save-btn"
  }`;

  return (
    <section className="card">
      <a
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt="картинка к фильму"
          src={
            isSavedMoviesPage
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          } 
        />
      </a>

      {isSavedMoviesPage ? (
        <button
          type="button"
          className="card__delete-button"
          onClick={handleDeleteButtonClick}
        />
      ) : (
        <button
          type="button"
          className={saveButtonClassName}
          onClick={handleButtonClick}
        ></button>
      )}

      <div className="card__info-wrapper">
        <label className="card__info-text">{card.nameRU}</label>
        <label className="card__info-duration">
          {formatDuration(card.duration)}
        </label>
      </div>
    </section>
  );
}

export default MoviesCard;
