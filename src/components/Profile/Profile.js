import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import Header from "../Header/Header";
import { useFormValidation } from "../../utils/useFormValidation";

function Profile(props) {
  const { onUpdateUser, logout } = props;

  const {
    values,
    errors,
    isValid,
    handleChange,
    setValue,
    reset,
    setIsValid,
    validateName,
    setErrors,
  } = useFormValidation();

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // состояние isEditing, указывает, находится ли форма в режиме редактирования или нет
  const [isEditing, setIsEditing] = useState(false);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser && currentUser.name) {
      // console.log("currentUser.name=>", currentUser.name)
      setValue('name', currentUser.name)
      setValue('email', currentUser.email)
      if (currentUser.name && currentUser.email) {
        setIsValid(true)
      }
    } 
  }, [currentUser, setIsValid, setValue]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values['name'],
      email: values['email'],
    });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function onLogout() {
    logout();
  }
  

  return (
    <>
      <Header isLoggedIn={true} />
      <main>
        <section className="profile">
          <div className="profile__container">
            <h3 className="profile__title">
              Привет, {values.name}!
              </h3>
            <form className="profile__form" 
              onSubmit={handleSubmit}
            >
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
                  onChange=/*{handleNameChange} */{handleChange}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
                <span className="profile__input-error">{errors.email}</span>
              </div>
              {isEditing ? (
                <button
                  type="submit"
                  className="profile__button-save profile__button"
                  disabled={!isValid}
                >
                  Сохранить
                </button>
              ) : (
                <button
                  type="button"
                  className="profile__button-edit profile__button"
                  onClick={handleEdit}
                >
                  Редактировать
                </button>
              )}
              <button
                type="button"
                className="profile__button-logout profile__button"
                onClick={onLogout}
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
