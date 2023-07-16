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
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import apiMain from "../../utils/MainApi";
import fail from "../../images/popup-fail-reg.svg";
import success from "../../images/popup-success-reg.svg";

function App() {
  // переменная состояния currentUser
  const [currentUser, setCurrentUser] = useState({});
  /* переменная содержит статус пользователя — вошёл он в систему или нет. 
  Начальное значение этой переменной false.
  Затем значение переменной подставляется динамически 
  в зависимости от статуса пользователя*/
  const [loggedIn, setLoggedIn] = useState(false);
  // переменная для отслеживания состояния загрузки во время
  // ожидания ответа от сервера
  const [isLoading, setIsLoading] = useState(false);
  // состояние информационного попапа
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Состояние для открытия/закрытия InfoTooltip
  const [infoTooltipImage, setInfoTooltipImage] = useState(""); // Значение для пропса image
  const [infoTooltipMessage, setInfoTooltipMessage] = useState(""); // Значение для пропса title

  const navigate = useNavigate();
  // const location = useLocation();

  //регистрация
  function handleSubmitRegister({ name, email, password }) {
    // setIsLoading(true);
    apiMain
      .register(name, email, password)
      .then((userData) => {
        if (userData) {
          handleSubmitLogin({ email, password });
          // console.log(userData);
          // navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        // setInfoTooltipImage(fail);
        // setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        // setInfoTooltipOpen(true); // Открываем InfoTooltip
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
        // setInfoTooltipOpen(true);
        // setInfoTooltipImage(success);
        // setInfoTooltipMessage("Вы успешно зарегистрировались!");
      });
  }
  
  // загрузка данных пользователя с сервера
  useEffect(() => { 
    if (loggedIn) {
      // console.log(loggedIn);
      apiMain.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  // авторизации(вход)
  function handleSubmitLogin({email, password}) {
    // setIsLoading(true);
    
    apiMain.authorize(email, password)
      .then((data) => {
        if (data.token) {
        setLoggedIn(true);
        // localStorage.setItem("loggedIn", "true");
        localStorage.setItem("token", data.token); // Сохранение токена в локальное хранилище
        // setCurrentUser({email, password})
        // console.log("data.token", data.token)
        navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }
  
  // функция проверки токена
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    apiMain.checkToken(token)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        // localStorage.setItem("loggedIn", "true");
        setCurrentUser(res.data);
        console.log("loggedIn", loggedIn)
        console.log("res.data", res)
        console.log("token", token)
      }
    })
    .catch((err) => console.log(err));

  }, []);


  // функция выхода из профиля
  function handleLogout() {
    apiMain
      .logout()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // изменение данных пользователя
  function handleUserUpdate(inputData) {
    setIsLoading(true);
    apiMain
      .setUserInfo(inputData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="app">
      <div className="app__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={<Main />}
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  logout={handleLogout}
                  login={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  login={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  handleUserUpdate={handleUserUpdate}
                  login={loggedIn}
                />
              }
            />
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
            <Route
              path="/*"
              element={<ErrorNotFound />}
            />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
