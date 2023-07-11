// описание запросов к сервису beatfilm-movies   https://api.nomoreparties.co/beatfilm-movies
const apiConfigMovies = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  // headers: {
  //   "Content-Type": "application/json",
  // },
};

class MoviesApi {
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

  // загрузка фильмов с сервера, метод GET по умолчанию
  getInitialMovies() {
    // const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}`, {
      // credentials: "include",
      headers: {
        "Content-Type": "application/json"
      //   authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res) /*console.log('res =>', res)*/);
  }
}

// экземпрляр класса MoviesApi
export const apiMovies = new MoviesApi(apiConfigMovies);