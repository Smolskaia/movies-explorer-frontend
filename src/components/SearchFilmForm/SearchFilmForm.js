import React from "react";
import "./SearchFilmForm.css";
import search from "../../images/search-button.svg";
import icon from "../../images/search-icon.svg";
import SearchFilmCheckbox from '../SearchFilmCheckbox/SearchFilmCheckbox';

function SearchFilmForm(props) {
  const { searchMovieText, setSearchMovieText, onSubmit, isShortMovies, setIsShortMovies } = props;

  // Обработка изменения значения ввода
  function handleChange(event) {
    setSearchMovieText(event.target.value);
  }

function handleSubmit(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
  onSubmit(); // Вызываем функцию onSubmit, переданную как свойство
}

  return (
    <section className="search-film">
      <form className="search-film__form" onSubmit={handleSubmit}>
        <div
          className="search-film__icon">
          <img src={icon} alt="иконка поиск"/>
        </div>
        <input
          className="search-film__input"
          type="text"
          placeholder="Фильм"
          value={searchMovieText}
          onChange={handleChange}
          required
        ></input>
        <button
          className="search-film__button"
          type="submit">
          <img src={search} alt="кнопка поиск"/>
        </button>
      </form>
      <SearchFilmCheckbox isShortMovies={isShortMovies} setIsShortMovies={setIsShortMovies}/>
    </section>
  );
}

export default SearchFilmForm;
