import React from "react";
import "./SearchFilmCheckbox.css";

function SearchFilmCheckbox(props) {
  const { isShortMovies, setIsShortMovies } = props;

// переключение чекбокса
function checkboxToggle(event) {
  const newValue = event.target.checked;
  setIsShortMovies(newValue);
  localStorage.setItem('isShortMovies', String(newValue));
}

  return (
    <div className="checkbox">
      <input
        className="checkbox-toggle"
        type="checkbox"
        checked={isShortMovies}
        onChange={checkboxToggle}
      />
      <label className="checkbox__text">Короткометражки</label>
    </div>
  );
}

export default SearchFilmCheckbox;
