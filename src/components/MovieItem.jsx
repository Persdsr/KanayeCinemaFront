import React from 'react';
import {Link} from "react-router-dom";

const MovieItem = ({fileName, movieId}) => {
    return (
        <div className="movie-list-item">
            <a href={`/movie/${movieId}`}>
                <img className="movie-list-item-img" src={`${fileName}`} alt=""/>
            </a>
        </div>
    );
};

export default MovieItem;