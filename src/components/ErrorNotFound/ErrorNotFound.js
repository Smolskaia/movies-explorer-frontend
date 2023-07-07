import React from "react";
import { Link } from "react-router-dom";
import "./ErrorNotFound.css";

function ErrorNotFound() {
  return (
    <section className="error-not-found">
      <h2 className="error-not-found__title">404</h2>
      <p className="error-not-found__text">Страница не найдена</p>
      <Link
        to="/"
        className="error-not-found__link"
      >
        Назад
      </Link>
    </section>
  );
}

export default ErrorNotFound;
