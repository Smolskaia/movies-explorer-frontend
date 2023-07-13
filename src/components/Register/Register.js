import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import { useFormValidation } from "../../utils/useFormValidation";

function Register() {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleNameChange,
    setValue,
    reset,
    setIsValid,
    setErrors,
  } = useFormValidation();

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
    >
      <label className="form__field">Имя</label>
      <input
        name="name"
        id="name-input"
        className="form__input"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleNameChange}
      />
      <span className="form__input-error">{errors.name}</span>
      <label className="form__field">E-mail</label>
      <input
        name="email"
        id="email-input"
        className="form__input"
        type="email"
        required
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.email}</span>
      <label className="form__field">Пароль</label>
      <input
        name="password"
        id="password-input"
        className="form__input"
        type="password"
        required
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.password}</span>
    </Form>
  );
}

export default Register;
