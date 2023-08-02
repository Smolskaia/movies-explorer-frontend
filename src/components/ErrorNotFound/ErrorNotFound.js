import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ErrorNotFound.css";

function ErrorNotFound() {
  
  const navigate = useNavigate();
  
  const handleClick = (evt) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <section className="error-not-found">
      <h2 className="error-not-found__title">404</h2>
      <p className="error-not-found__text">Страница не найдена</p>
      <Link
        to="#"
        className="error-not-found__link"
        onClick={handleClick}
      >
        Назад
      </Link>
    </section>
  );
}

export default ErrorNotFound;
