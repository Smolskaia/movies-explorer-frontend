import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import { useFormValidation } from "../../utils/useFormValidation";

function Register({onRegister}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleNameChange,
    // setValue,
    // reset,
    // setIsValid,
    // setErrors,
  } = useFormValidation();

  function handleRegister(e) {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }
  console.log(isValid)
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      handleSubmit={handleRegister}
      isValid={isValid}
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
        onChange={handleChange}
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
        minLength="2"
        maxLength="40"
        required
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="form__input-error">{errors.password}</span>
    </Form>
  );
}

export default Register;
