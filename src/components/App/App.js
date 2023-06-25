import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";

// import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";

import { Routes, Route } from "react-router-dom";


function App() {


  return (
    <div className="app">
      <div className="app__container">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/saved-movies" element={<SavedMovies />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>
        
        {/* <Route path="/error" element={<ErrorNotFound />}/> */}

      </Routes>
      </div>
    </div>
  );
}

export default App;
