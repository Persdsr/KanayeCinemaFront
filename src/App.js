import './styles/App.css';
import React  from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./components/navbar/NotFound";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Login from "./pages/Login";
import User from "./pages/User";
import MovieByGenre from "./pages/MovieByGenre";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Movie/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/signin"} element={<Login/>}/>
                <Route path={"/user"} element={<User/>}/>
                <Route path={"/movie/:id"} element={<MovieDetail/>}/>
                <Route path={"/genre/:genre"} element={<MovieByGenre/>}/>
                <Route path={"/create"} element={<Create/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App;