import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const {
    trailerLink,
    name,
    image,
    duration,
    onSave,
    onDelete,
    isSaved,
    isSavedMoviesPage, // определяет, находится ли компонент на странице сохраненных фильмов (true) или на странице всех фильмов (false)
    country,
    director,
    year,
    description,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = props;

  const [isSaveBtnActive, setIsSaveBtnActive] = useState(isSaved);

  function handleSaveButtonClick() {
    setIsSaveBtnActive(!isSaveBtnActive);
    onSave({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
  };

  const handleDeleteButtonClick = (movieId) => {
    onDelete();
  };


  // Функция перевода минут в часы и минуты
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м`;
  };

  // console.log(isSavedMoviesPage);
  // console.log(image);
  // console.log(trailerLink);

  return (
    <section className="card">
      <a
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt="картинка к фильму"
          src={`https://api.nomoreparties.co${image}`} // Добавляем базовый URL к относительному URL изображения
        />
      </a>

      {isSavedMoviesPage ? (
        <button
          type="button"
          className="card__delete-button"
          onClick={handleDeleteButtonClick}
        />
      ) : isSaved ? (
        <button
          type="button"
          className={`card__save-btn ${
            isSaveBtnActive ? "card__save-btn_active" : ""
          }`}
          onClick={handleDeleteButtonClick}
        />
      ) : (
        <button
          type="button"
          className="card__save-btn"
          onClick={handleSaveButtonClick}
        />
      )}

      <div className="card__info-wrapper">
        <label className="card__info-text">{name}</label>
        <label className="card__info-duration">{formatDuration(duration)}</label>
      </div>
    </section>
  );
}

export default MoviesCard;
