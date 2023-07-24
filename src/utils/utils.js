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
  const oldSaveMovie = movies.find( film => film._id === movie._id)
  if (!oldSaveMovie){
    localStorage.setItem("savedMovies", JSON.stringify([...movies, movie]))
  }
  return 
}

export const deleteMoviesOnLocalStorage = (movie) => {
  const data = localStorage.getItem("savedMovies")

  if (!data) {
    return 
  }
  const movies = JSON.parse(data);
  const newSavedMovies = movies.filter( film => film._id !== movie._id)
  localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies))

  return 
}