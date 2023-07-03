import React, { useState } from "react";
import "./MoviesCard.css";
// import card from "../../images/movie-img.svg";

function MoviesCard(props) {
  const { trailerLink, name, image, handleSaveClick, isSaved } = props;
  const [isSaveBtnActive, setIsSaveBtnActive] = useState(isSaved);
  


  // Вызываем функцию, переданную через props для сохранения
  const handleSaveButtonClick = () => {
    setIsSaveBtnActive(!isSaveBtnActive);
    handleSaveClick(); 
  };


  return (
    <section className="card-container">
      <a
        href={trailerLink}
      >
        <img
          className="card__image"
          alt="картинка к фильму"
          src={image}
        />
      </a>

      {isSaved ? (
        
        <button
          type="button"
          // className="card__save-btn card__save-btn_active"
          className={`card__save-btn ${isSaveBtnActive ? "card__save-btn_active" : ""}`}
          onClick={handleSaveButtonClick}
        />
      ) : (
        <button
          type="button"
          className="card__save-btn"
          onClick={handleSaveButtonClick}
        />
      )}
      
      {/* <button
        type="button"
        className="card__delete-button"
      /> */}
      <div className="card__info-wrapper">
        <label className="card__info-text">{name}</label>
        <label className="card__info-duration">1ч 17м</label>
      </div>
    </section>

  );
}

export default MoviesCard;
