import React from "react";
import "./SearchFilmCheckbox.css";

function SearchFilmCheckbox() {
  return (
    <div className="checkbox-container">
      <input
        className="checkbox-toggle"
        type="checkbox"
        defaultChecked
      />
      <label className="checkbox__text">Короткометражки</label>
    </div>
  );
}

export default SearchFilmCheckbox;
