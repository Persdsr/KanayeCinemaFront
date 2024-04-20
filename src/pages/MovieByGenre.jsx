import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MovieService from "../service/MovieService";

const MovieByGenre = () => {
    let params = useParams()
    let [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenre = async () => {
            let genre = params.genre
            console.log(genre)
            try {
                const response = await MovieService.getMoviesByGenre("Боевик");
                setGenres(response.data);
                console.log(response.data)
                console.log(params.genre)
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchGenre();

    }, [params.genre]);

    return (
        <div>

        </div>
    );
};

export default MovieByGenre;