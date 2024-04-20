import React, {useEffect, useState} from 'react';
import "../styles/style.css"
import MovieService from "../service/MovieService";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
    let [movie, setMovie] = useState([]);
    let params = useParams();

    const navigate = useNavigate();
    const [useRoles, setRoles] = useState([""])
    const [username, setUsername] = useState("")

    const [comment, setComment] = useState({
        movieId: params.id,
        message: '',
        username: username
    })


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await MovieService.getMovieById(params.id);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
        fetchContent();
    }, [params.id]);

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

    async function fetchContent() {
        try {
            const res = await fetch("http://localhost:8080/api/auth/userinfo", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.ok) {
                const json = await res.json();
                setRoles(json.roles)
                setUsername(json.username)
                setComment(prevComment => ({
                    ...prevComment,
                    username: json.username
                }));
            } else {
                console.error(`Failed to fetch: ${res.status} - ${res.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }

    async function postComment(e) {

        console.log(comment)
        try {
            const res = await axios.post("http://localhost:8080/add_comment", new Blob([JSON.stringify(comment)], { type: 'application/json' }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        } catch (error) {
            console.log("Ошибка добавления коммента " + error)
        }
    }

    const handleChange = (e) => {
        const {name, value, type} = e.target
        setComment((prevComment) => ({
            ...prevComment,
            [name]: value
            })
        )
    }

    return (
        <div className="container-detail">
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
                            (movie.genres.map((genre, index) => <span>{genre.title}{index !== movie.genres.length - 1 ? ", " : ""}</span>)) :
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
                    useRoles.includes("MODERATOR") || useRoles.includes("ADMIN") || username === movie.author ? <button onClick={deleteMovie} className="btn-delete">Удалить</button> : ""
                }

            </div>
            <div className="block-comments">
                <div className="block-create-comment">
                    <img className="comment-avatar" src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
                    <form onSubmit={(e) => postComment(e)}>
                        <textarea onChange={handleChange} placeholder="Написать комментарий" className="comment-area" name="message" id="message"></textarea>
                        <button className="btn-create-comment">Отправить</button>
                    </form>
                </div>
                {movie.comments ? movie.comments.map((comment) =>
                    <div className="block-comment" key={comment.id}>
                        <img className="comment-avatar" src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
                        <div className="comment-info">
                            <div>{comment.author ? comment.author.username : 'Unknown User'}</div>
                            <div>{comment.message}</div>
                        </div>
                    </div>
                ) : ""}

            </div>
        </div>
    );
};

export default MovieDetail;