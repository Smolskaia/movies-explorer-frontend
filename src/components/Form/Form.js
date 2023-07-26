import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import logo from "../../images/header-logo.svg";

function Form(props) {
  const {
    title,
    children,
    buttonText,
    question,
    linkText,
    link,
    handleSubmit,
    isValid,
  
  } = props;

  return (
    <div className="form">
      <Link
        to="/"
        className="form__logo"
      >
        <img
          src={logo}
          alt="логотип"
        />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form
        className="form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
        <button
          type="submit"
          className={isValid ? 'form__btn-save' : 'form__btn-save_disabled'}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
      <span className="form__text">
        {question}
        <Link
          to={link}
          className="form__link"
        >
          {linkText}
        </Link>
      </span>
    </div>
  );
}

export default Form;
