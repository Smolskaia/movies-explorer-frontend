import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import apiMain from "../../utils/MainApi";
import { setAllMoviesOnLocalStorage } from "../../utils/utils";
import fail from "../../images/popup-fail-reg.svg";
// import success from "../../images/popup-success-reg.svg";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {
  // переменная состояния currentUser
  const [currentUser, setCurrentUser] = useState({});
  /* переменная содержит статус пользователя — вошёл он в систему или нет. 
  Начальное значение этой переменной false.
  Затем значение переменной подставляется динамически 
  в зависимости от статуса пользователя*/
  const [loggedIn, setLoggedIn] = useState(false);
  //  состояние указывает на то, была ли проверена валидность токена
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  // переменная для отслеживания состояния загрузки во время
  // ожидания ответа от сервера
  const [isLoading, setIsLoading] = useState(true);
  // состояние информационного попапа
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState("");
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");

  const navigate = useNavigate();

  //регистрация
  function handleSubmitRegister({ name, email, password }) {
    setIsLoading(true);
    apiMain
      .register(name, email, password)
      .then((userData) => {
        if (userData) {
          handleSubmitLogin({ email, password });
        }
      })
      .catch((err) => {
        setInfoTooltipImage(fail);
        setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // загрузка данных пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true); 
      apiMain
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  // авторизации(вход)
  async function handleSubmitLogin({ email, password }) {
    setIsLoading(true);
    try {
      const data = await apiMain.authorize(email, password);
      const {data: savedMovies} = await apiMain.getSavedMovies();
      setAllMoviesOnLocalStorage(savedMovies)
      if (data.token) {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      }
      setIsLoading(false);
    } catch (err) {
      setInfoTooltipImage(fail);
      setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
      setInfoTooltipOpen(true);
      console.log(err);
      setIsLoading(false);
    }
  }

  // функция проверки токена
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsTokenChecked(true);
      return;
    }
    apiMain
      .checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsTokenChecked(true);
          setCurrentUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  // функция выхода из профиля
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchMovieText");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("isShortMovies");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("allMovies");
    setCurrentUser({});
    navigate("/");
  }

  // изменение данных пользователя
  function handleUserUpdate(inputData) {
    // console.log("inputData => ", inputData);
    setIsLoading(true);
    apiMain
      .setUserInfo(inputData)
      .then((res) => {
        setCurrentUser(res.data);
        console.log("res => ", res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // функция для закрытия информационного попапа
  function handleCloseInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  // условие возвращения компонента Preloader, если isTokenChecked равно false.
  // Если токен еще не проверен, то будет отображаться прелоадер все время
  // проверки токена
  if (!isTokenChecked) {
    return <Preloader />;
  }

  return (
    <div className="app">
      <div className="app__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <Main 
                loggedIn={loggedIn}
                />}
            />
            {loggedIn ? (
              <>
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={Movies}
                      loggedIn={loggedIn}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={SavedMovies}
                      loggedIn={loggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={Profile}
                      onUpdateUser={handleUserUpdate}
                      logout={handleLogout}
                      loggedIn={loggedIn}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/signin"
                  element={
                    <Login
                      isLoading={isLoading}
                      onLogin={handleSubmitLogin}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <Register
                      isLoading={isLoading}
                      onRegister={handleSubmitRegister}
                    />
                  }
                />
              </>
            )}
            <Route
              path="/*"
              element={<ErrorNotFound />}
            />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
      <InfoTooltip
        image={infoTooltipImage}
        title={infoTooltipMessage}
        isPopupOpen={infoTooltipOpen}
        onClose={handleCloseInfoTooltip}
      />
    </div>
  );
}

export default App;
