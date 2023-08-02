// описание запросов к нашему Api

const apiConfigMain = {
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.pro-movies.nomoredomains.rocks",
  // headers: {
  //   "Content-Type": "application/json",
  // },
};

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  // проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // аутентификация(регистрация) пользователя
  // Эндпоинт: /signup      Метод: POST
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
  }

  // авторизации(вход) пользователя
  // Эндпоинт: /signin      Метод: POST
  // возвращает token
  authorize(email, password) {
    // console.log(email, password);
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        // console.log("jwt", data.token);
        return data;
      });
  }

  // проверка валидности токена - вызывается каждый раз при загрузке приложения
  // при успешной проверке мы будем навигейтить в основной раздел
  // и не нужно будет заного вводить логин и пароль
  // Эндпоинт: /users/me      Метод: GET
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // загрузка данных пользователя с сервера, GET
  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  // выход из профиля
  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // редактирование профиля, PATCH
  setUserInfo(obj) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        email: obj.email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // добавление фильма в сохраненные, POST-запрос
  addSavedMovie(movieData) {
    const imageBaseUrl = "https://api.nomoreparties.co";
    const token = localStorage.getItem("jwt");
    // console.log(movieData.id);
    // console.log(movieData._id);
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: imageBaseUrl + movieData.image.url,
        trailerLink: movieData.trailerLink,
        thumbnail: imageBaseUrl + movieData.image.formats.thumbnail.url,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN
      }),
    }).then((res) => this._checkResponse(res));
  }

  // сохраненные фильмы
  getSavedMovies() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // удаление сохраненного фильма, DELETE-запрос
  deleteSavedMovie(movieId) {
    const token = localStorage.getItem("jwt");
    // console.log('movieId =>', movieId)
    return fetch(`${this._baseUrl}/movies/${movieId.id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }
}

// экземпрляр класса MainApi
const apiMain = new MainApi(apiConfigMain);

export default apiMain;
