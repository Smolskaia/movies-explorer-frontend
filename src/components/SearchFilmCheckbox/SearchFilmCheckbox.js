import React from "react";
import "./SearchFilmCheckbox.css";

function SearchFilmCheckbox(props) {
  const { shortMovies, setShortMovies } = props;

// переключение чекбокса
function checkboxToggle(event) {
  const newValue = event.target.checked;
  setShortMovies(newValue);
  localStorage.setItem('shortMovies', String(newValue));
}

  return (
    <div className="checkbox">
      <input
        className="checkbox-toggle"
        type="checkbox"
        checked={shortMovies}
        onChange={checkboxToggle}
      />
      <label className="checkbox__text">Короткометражки</label>
    </div>
  );
}

export default SearchFilmCheckbox;
