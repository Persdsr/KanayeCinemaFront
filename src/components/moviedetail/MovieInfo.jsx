import React from 'react';
import {useNavigate} from "react-router-dom";

const MovieInfo = ({movie, roles, username}) => {
    const navigate = useNavigate();

    function deleteMovie() {
        const answer = window.confirm("Вы точно хотите удалить фильм?");
        if (answer) {
            fetch("http://localhost:8080/api/delete_movie/" + movie.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            navigate("/")
        } else {

        }
    }

    return (
        <div className="block-information">
            <img className="full-poster" src={movie.fullPoster} alt="ещкере"/>
            <div className="info-table">
                <div className="info-row">
                    <div className="info-label">Название</div>
                    <div className="info-value">{movie.title}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Длительность</div>
                    <div className="info-value">{movie.duration}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Слоган</div>
                    <div className="info-value">{movie.slogan}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Жанры</div>
                    <div className="info-value">{movie.genres !== undefined ?
                        (movie.genres.map((genre, index) =>
                            <span>{genre}{index !== movie.genres.length - 1 ? ", " : ""}</span>)) :
                        "-"
                    }</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Бюджет</div>
                    <div className="info-value">{movie.budget}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Год премьеры</div>
                    <div className="info-value">{movie.yearProduction}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Автор</div>
                    <div className="info-value">{movie.author}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Страна</div>
                    <div className="info-value">{movie.country}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Возрастное ограничение</div>
                    <div className="info-value">{movie.ageLimit}</div>
                </div>
            </div>
            {
                roles.includes("MODERATOR") || roles.includes("ADMIN") || username === movie.author ?
                    <button onClick={deleteMovie} className="btn-delete">Удалить</button> : ""
            }

        </div>
    );
};

export default MovieInfo;