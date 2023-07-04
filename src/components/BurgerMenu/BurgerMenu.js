import React from "react";
import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import account from "../../images/account-image.svg";

function BurgerMenu(props) {

  const { menuIsOpen, handleCloseMenu } = props;


  return (
    <div className={`burger-menu ${menuIsOpen ? "burger-menu_active" : ""}`}>
       <div className="burger-menu__overlay" />
      <div className={"burger-menu__container"}>
        <button className="burger-menu__close-btn" onClick={handleCloseMenu}/>
        <ul className="burger-menu__items">
          <li><NavLink to="/" className='menu__item'>Главная</NavLink></li>
          <li><NavLink to="/movies" className='menu__item'>Фильмы</NavLink></li>
          <li><NavLink to="/saved-movies" className='menu__item'>Сохраненные фильмы</NavLink></li>
        </ul>
        <nav className="burger-menu__account-wrapper">
          <NavLink to="/profile" className="burger-menu__account"> 
            Аккаунт
            <img className="burger-menu__account-image" src={account} alt="аккаунт"/>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default BurgerMenu;
