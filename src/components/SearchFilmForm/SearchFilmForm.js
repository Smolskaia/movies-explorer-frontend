import React from "react";
import "./SearchFilmForm.css";
import search from "../../images/search-button.svg";
import icon from "../../images/search-icon.svg";
import SearchFilmCheckbox from '../SearchFilmCheckbox/SearchFilmCheckbox';

function SearchFilmForm() {
  return (
    <section className="search-film">
      <form className="search-film__form">
        <div
          className="search-film__icon">
          <img src={icon} alt="иконка поиск"/>
        </div>
        <input
          className="search-film__input"
          type="text"
          placeholder="Фильм"
          required
        ></input>
        <button
          className="search-film__button"
          type="submit">
          <img src={search} alt="кнопка поиск"/>
        </button>
      </form>
      <SearchFilmCheckbox />
      {/* <span className="search-film__form-line"></span> */}
    </section>
  );
}

export default SearchFilmForm;
