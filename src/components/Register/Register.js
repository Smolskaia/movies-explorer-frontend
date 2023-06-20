import React from 'react';
import './Register.css';
import Form from '../Form/Form';

function Register() {
  return (
    <Form
    title="Добро пожаловать!"
    buttonText="Зарегистрироваться"
    question="Уже зарегистрированы?"
    linkText=" Войти"
    link="/signin">
    <label className="form__field">
      Имя
    </label>
    <input
      name="name"
      id="name-input"
      className="form__input"
      type="text"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="form__input-error"></span>
    <label className="form__field">
      E-mail
    </label>
    <input
      name="email"
      id="email-input"
      className="form__input"
      type="email"
      required
    />
    <span className="form__input-error"></span>
    <label className="form__field">
      Пароль
    </label>
    <input
      name="password"
      id="password-input"
      className="form__input"
      type="password"
      required
    />
    <span className="form__input-error"></span>
  </Form>
  );
}

export default Register;