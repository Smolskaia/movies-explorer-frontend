import React from "react";
import "./MoviesCard.css";
import { formatDuration } from '../../utils/utils';

function MoviesCard(props) {
  const {
    onSave,
    onDelete,
    isSavedMoviesPage,
    card,
    isSaved,
  } = props;

  function handleButtonClick() {
    if (isSaved) {
      onDelete(card);
    } else {
      onSave(card);
    }
  }

  function handleDeleteButtonClick() {
    onDelete(card);
  }
  
  const saveButtonClassName = `${isSaved ? "card__save-btn_active" : "card__save-btn"}`;

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
          src={isSavedMoviesPage ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
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
