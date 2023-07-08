// компонент модального окна,который информирует пользователя об ошибках
import React from "react";
import "./InfoTooltip.css";

function InfoTooltip({  image, title, isPopupOpen, onClose, }) {
  return (
<div className="popup popup_opened">
    {/* <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`}> */}
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
        <img className="popup__pic" src={image} alt={title} />
        <h2 className="popup__text">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
