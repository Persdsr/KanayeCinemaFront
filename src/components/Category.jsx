import React, { useState, useRef } from "react";
import MovieItem from "./MovieItem";
import rightArrowImage from "../styles/arrow_right.png";
import leftArrowImage from "../styles/arrow_left.png";

function Genre({ genre }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);

    const handleScroll = (direction) => {
        const scrollAmount = 350; // Измените значение по вашему усмотрению
        if (direction === "left") {
            movieListRef.current.scrollLeft -= scrollAmount;
        } else if (direction === "right") {
            movieListRef.current.scrollLeft += scrollAmount;
        }
        setScrollPosition(movieListRef.current.scrollLeft);
    };

    return (
        <div className="movie-list-container">
            <h1 className="movie-list-title"><a href={`/genre/${genre.title}`}>{genre.title}</a></h1>
            <div className="movie-list-wrapper" ref={movieListRef}>
                {genre.movies.map((movie) => (
                    <MovieItem fileName={movie.poster} movieId={movie.id} key={movie.id} />
                ))}
            </div>
            <button
                className="scroll-button left"
                onClick={() => handleScroll("left")}
            >
                <img className="arrow-scroll" src={leftArrowImage} alt=""/>
            </button>
            <button
                className="scroll-button right"
                onClick={() => handleScroll("right")}
            >
                <img className="arrow-scroll" src={rightArrowImage} alt=""/>

            </button>
        </div>
    );
}

export default Genre;