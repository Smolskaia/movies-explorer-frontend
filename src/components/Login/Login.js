import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useFormValidation } from '../../utils/useFormValidation';

function Login() {
  const { values, errors, isValid, handleChange, setValue, reset, setIsValid } = useFormValidation();

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup">
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
        value={values.password || ''}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.password}</span>
    </Form>
  );
}

export default Login;