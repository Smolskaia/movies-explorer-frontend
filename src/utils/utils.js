 // Функция перевода минут в часы и минуты
 export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}ч ${remainingMinutes}м`;
};

export const setMoviesOnLocalStorage = (movie) => {
  const data = localStorage.getItem("savedMovies")

  if (!data) {
    localStorage.setItem("savedMovies", JSON.stringify([movie]))
    return 
  }
  const movies = JSON.parse(data);
  const oldSaveMovie = movies.find( film => film.movieId === movie.movieId)
  if (!oldSaveMovie){
    localStorage.setItem("savedMovies", JSON.stringify([...movies, movie]))
  }
  return 
}

export const setAllMoviesOnLocalStorage = (movies) => {
    localStorage.setItem("savedMovies", JSON.stringify(movies))
}

const checkId = (movie) => {
  if(movie.id) return movie.id

  return movie.movieId
}

export const deleteMoviesOnLocalStorage = (movie) => {
  const data = localStorage.getItem("savedMovies")

  if (!data) {
    return 
  }
  const movies = JSON.parse(data);
  const newSavedMovies = movies.filter( film => film.movieId !== checkId(movie))
  localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies))

  return 
}

export const getMoviesOnLocalStorage = () => {
  const data = localStorage.getItem("savedMovies")

  if (!data) {
    return []
  }
  const movies = JSON.parse(data);

  return movies
}