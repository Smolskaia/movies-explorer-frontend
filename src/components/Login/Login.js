import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useFormValidation } from '../../utils/useFormValidation';

function Login({onLogin}) {
  const { values, errors, isValid, handleChange, setValue, reset, setIsValid } = useFormValidation();

  function handleLogin(e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      handleSubmit={handleLogin}
      isValid={isValid}
      >
      <label className="form__field">
        E-mail
      </label>
      <input
        name="email"
        className="form__input"
        id="email-input"
        type="email"
        required
        value={values.email || ''}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.email}</span>
      <label className="form__field">
        Пароль
      </label>
      <input
        name="password"
        className="form__input"
        id="password-input"
        type="password"
        required
        minLength="2"
        maxLength="40"
        value={values.password || ''}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.password}</span>
    </Form>
  );
}

export default Login;