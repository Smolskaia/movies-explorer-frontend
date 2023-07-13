import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { useFormValidation } from "../../utils/useFormValidation";

function Profile() {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleNameChange,
    setValue,
    reset,
    setIsValid,
    validateName,
    setErrors,
  } = useFormValidation();
  

  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="profile">
          <div className="profile__container">
            <h3 className="profile__title">Привет, Анна!</h3>
            <form className="profile__form">
              <div className="profile__form-row">
                <label className="profile__field">Имя</label>
                <input
                  name="name"
                  className="profile__input"
                  type="text"
                  minLength="2"
                  maxLength="40"
                  placeholder="Имя"
                  required
                  value={values.name || ""}
                  onChange={handleNameChange}
                />
                <span className="profile__input-error">{errors.name}</span>
              </div>
              <div className="profile__line"></div>
              <div className="profile__form-row">
                <label className="profile__field">E-mail</label>
                <input
                  name="email"
                  className="profile__input"
                  type="email"
                  placeholder="E-mail"
                  required
                  value={values.email || ""}
                  onChange={handleChange}
                />
                <span className="profile__input-error">{errors.email}</span>
              </div>
              <button
                type="submit"
                className="profile__button-save profile__button"
              >
                Редактировать
              </button>
              <button
                type="button"
                className="profile__button-logout profile__button"
              >
                Выйти из аккаунта
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
