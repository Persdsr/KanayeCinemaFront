import React, {useEffect, useState} from "react";
import BigMoviePoster from "../components/BigMoviePoster";
import MovieService from "../service/MovieService";
import Genre from "../components/Category";



function Movie() {
    let [genres, setGenres] = useState([]);
    let [bigMovies, setBigMovies] = useState([]);

    useEffect(() => {
        fetchGenresAndMovies()
    }, []);

    async function fetchGenresAndMovies() {
        let genres = await MovieService.getAll();
        setGenres(genres.data);

        let bigMovies = await MovieService.getLastTwoBigMovies();
        setBigMovies(bigMovies.data)
    }


    return (
        <div className="content-container">

            {bigMovies[0] ? <BigMoviePoster bigMovie={bigMovies[0]} /> : ""}

            {genres.slice(0, 2).map((genre) => (
               genre.movies.length > 0 ? <Genre genre={genre} key={genre.id} /> : ""
            ))}

            <div className="space"></div>

            {bigMovies[1] ? <BigMoviePoster bigMovie={bigMovies[1]} /> : ""}

            {genres.slice(1, 2).map((genre) => (
                genre.movies.length > 0 ? <Genre genre={genre} key={genre.id} /> : ""
            ))}
        </div>
    );
}

export default Movie;