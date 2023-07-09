// описание запросов к нашему Api

const apiConfigMain = {
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://api.pro-movies.nomoredomains.rocks",
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
  // возвращает userData
  register(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }

  // авторизации(вход) пользователя
  // Эндпоинт: /signin      Метод: POST
  // возвращает token
  authorize(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return data;
      });
  }

  // выход из профиля
  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponse(res)
      })
  }

  // загрузка данных пользователя с сервера, GET
  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
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
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      id,
      nameRU,
      nameEN,
    } = movieData;

    const token = localStorage.getItem("jwt");

    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId: id,
        nameRU,
        nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => {
          return this._checkResponse(res)
        })
  }

  // удаление сохраненного фильма, DELETE-запрос
  deleteSavedMovie(movieId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/movies/${movieId._id}`, {
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
