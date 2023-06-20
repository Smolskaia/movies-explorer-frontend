import React from "react";
import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from "../../images/header-logo.svg";
import account from "../../images/account-image.svg";
import burger from "../../images/header-burger.svg";
import "./Header.css";

function Header() {
  // хук состояния useState используется для реализации условного 
  // рендеринга в хедере
  const [isLoggedIn, setIsLoggedIn] = useState(false); // false/true

  return (
    <>
    <div className={`header ${isLoggedIn ? '' : 'header__logged-out'}`}>
      <Link to="/" className="header__logo">
        <img src={logo} alt="Логотип проекта"/>
      </Link>
      {isLoggedIn ? (
        <nav className="header__menu_loged-in">
        <div className="header__button-wrapper_loged-in">
          <NavLink to="/movies" className="header__button header__button-movies">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="header__button header__button-saved-movies">Сохранённые фильмы</NavLink>
        </div>

        <div className="header__button-wrapper">
          <Link to="/profile" className="header__button header__button-account">
            Аккаунт
            <img src={account} alt="аккаунт" className='header__account-image'/>
          </Link>
          <button className="header__button-burger">
            <img src={burger} alt="бургер-меню" />
          </button>
        </div>
      </nav>
      ) : (
        <div className="header__button-wrapper">
        <Link to="/signup" className="header__button header__button-signup">Регистрация</Link>
        <Link to="/signin" className="header__button header__button-signin">Войти</Link>
      </div>
      )}
    </div>
    </>
  );
}

export default Header;