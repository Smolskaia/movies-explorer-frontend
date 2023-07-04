import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const {
    trailerLink,
    name,
    image,
    handleSaveClick,
    isSaved,
    isSavedMoviesPage, // определяет, находится ли компонент на странице сохраненных фильмов (true) или на странице всех фильмов (false)
  } = props;
  
  const [isSaveBtnActive, setIsSaveBtnActive] = useState(isSaved);

  const handleSaveButtonClick = () => {
    setIsSaveBtnActive(!isSaveBtnActive);
    handleSaveClick();
  };

  // console.log(isSavedMoviesPage);

  return (
    <section className="card-container">
      <a href={trailerLink}>
        <img
          className="card__image"
          alt="картинка к фильму"
          src={image}
        />
      </a>

      {isSavedMoviesPage ? (
        <button type="button" className="card__delete-button" />
      ) : isSaved ? (
        <button
          type="button"
          className={`card__save-btn ${
            isSaveBtnActive ? "card__save-btn_active" : ""
          }`}
          onClick={handleSaveButtonClick}
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
        <label className="card__info-duration">1ч 17м</label>
      </div>
    </section>
  );
}

export default MoviesCard;
