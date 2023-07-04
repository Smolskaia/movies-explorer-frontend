import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../images/header-logo.svg";
import account from "../../images/account-image.svg";
import burger from "../../images/header-burger.svg";
import "./Header.css";
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header(props) {

  const { isLoggedIn } = props;

  // состояние, которое отслеживает, 
  // открыто ли меню, и передает это состояние в компонент BurgerMenu
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  const handleMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleCloseMenu = () => {
    setMenuIsOpen(false);
  };

  // console.log("menuIsOpen ",menuIsOpen);

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
          <button 
            className="header__button-burger" 
            onClick={handleMenuClick}
          >
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
    {menuIsOpen && <BurgerMenu menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu}/>}
    </>
  );
}

export default Header;