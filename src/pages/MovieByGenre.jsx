import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MovieService from "../service/MovieService";
import BigMoviePoster from "../components/BigMoviePoster";
import Genre from "../components/Category";
import MovieItem from "../components/MovieItem";

const MovieByGenre = () => {
    let params = useParams()
    let [genre, setGenre] = useState([]);
    useEffect(() => {
        const fetchGenre = async () => {
            let genre = params.genre
            try {
                const response = await MovieService.getMoviesByGenre(genre);
                setGenre(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchGenre();

    }, [params.genre]);

    return (
        <div>
            {/*{genre ? <BigMoviePoster bigMovie={genre[0]} /> : ""}*/}
            <div className="container_movies">
                <h1>{params.genre}</h1>

                {genre.map((movies) => (
                    genre.length > 0 ? <MovieItem fileName={movies.poster} movieId={movies.id} key={movies.id} /> : "123"
                ))}
            </div>
        </div>
    );
};

export default MovieByGenre;