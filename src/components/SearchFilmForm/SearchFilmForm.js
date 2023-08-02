import React, {useState} from "react";
import "./SearchFilmForm.css";
import search from "../../images/search-button.svg";
import icon from "../../images/search-icon.svg";
import SearchFilmCheckbox from "../SearchFilmCheckbox/SearchFilmCheckbox";

function SearchFilmForm(props) {
  const {
    searchMovieText,
    setSearchMovieText,
    onSubmit,
    isShortMovies,
    checkboxToggle,
  } = props;

  const [searchText, setSearchText] = useState("");

  // Обработка изменения значения ввода
  function handleChange(event) {
    if (setSearchMovieText){
      setSearchMovieText(event.target.value);
    }
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    onSubmit(searchText); // Вызываем функцию onSubmit, переданную как свойство
  }

  return (
    <section className="search-film">
      <form
        className="search-film__form"
        onSubmit={handleSubmit}
      >
        <div className="search-film__icon">
          <img
            src={icon}
            alt="иконка поиск"
          />
        </div>
        <input
          className="search-film__input"
          type="text"
          placeholder="Фильм"
          value={searchMovieText ?? searchText}
          onChange={handleChange}
          required
        ></input>
        <button
          className="search-film__button"
          type="submit"
        >
          <img
            src={search}
            alt="кнопка поиск"
          />
        </button>
      </form>
      <SearchFilmCheckbox
        isShortMovies={isShortMovies}
        checkboxToggle={checkboxToggle}
      />
    </section>
  );
}

export default SearchFilmForm;
