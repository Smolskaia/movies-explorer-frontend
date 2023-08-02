import React from "react";
import "./SearchFilmCheckbox.css";

function SearchFilmCheckbox(props) {
  const { isShortMovies, checkboxToggle } = props;


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
