import React, {useEffect, useState} from 'react';
import "../styles/style.css"
import MovieService from "../service/MovieService";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const MovieDetail = () => {
    let [movie, setMovie] = useState([]);
    let params = useParams();

    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const roles = localStorage.getItem("roles").split(",")

    const [comment, setComment] = useState({
        movieId: params.id,
        message: '',
        username: username
    })

    const [review, setReview] = useState({
        movieId: params.id,
        review: '',
        username: username,
        text: '',
        title: ''
    })

    const [modalActive, setModalActive] = useState(false)


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

    function deleteReview(reviewId) {
        const answer = window.confirm("Вы точно хотите удалить рецензию?");
        if (answer) {
            fetch("http://localhost:8080/api/review/" + reviewId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            window.location.reload()
        } else {

        }
    }


    async function postComment(e) {
        try {
            const res = await axios.post("http://localhost:8080/add_comment", new Blob([JSON.stringify(comment)], {type: 'application/json'}), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
        } catch (error) {
            console.log("Ошибка добавления коммента " + error)
        }
    }

    async function postReview(e) {
        try {
            const res = await axios.post(`http://localhost:8080/api/send_review`, new Blob([JSON.stringify(review)], {type: 'application/json'}), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
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

    const handleChangeReview = (e) => {
        const {name, value, type} = e.target
        setReview((prevReview) => ({
                ...prevReview,
                [name]: value
            })
        )
    }

    function toggleDropdown(event, index) {
        event.stopPropagation();

        let dropdownMenu = document.getElementById(`dropdownMenu-${index}`);
        if (dropdownMenu) {
            if (dropdownMenu.style.display === "block") {
                dropdownMenu.style.display = "none";
            } else {
                dropdownMenu.style.display = "block";
            }
        }
    }

    document.addEventListener("click", function(event) {
        let dropdownMenus = document.querySelectorAll(".dropdown-menu");
        let dropdownToggle = document.querySelectorAll(".dropdown-toggle");
        let targetElement = event.target;

        dropdownMenus.forEach(function(dropdownMenu, index) {
            if (dropdownMenu.style.display === "block" && !dropdownMenu.contains(targetElement) && !dropdownToggle[index].contains(targetElement)) {
                dropdownMenu.style.display = "none";
            }
        });
    });

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


            <div className="movie_info_block">
                <h1>Скриншоты</h1>
                <div className="movie_screenshots_container">
                    {movie.screenshots ? movie.screenshots.map((screenshot) =>
                        <img className="movie_screenshot_image" src={screenshot} alt=""/>
                    ) : ""}
                </div>
            </div>

            <br/><br/>
            <h1 style={{textAlign: "center"}}>тут видос</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <Modal active={modalActive} setActive={setModalActive} postReview={postReview} handleChangeReview={handleChangeReview}/>


            <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                <h1 style={{display: "inline-block", marginRight: "12px"}}>Рецензии</h1>
                {
                    (roles.some(role => ["ADMIN", "CRITIC"].includes(role)) ||
                        movie.author === username ) && (
                        <button className="green_btn" onClick={() => setModalActive(true)}>Написать рецензию</button>
                    )

                }
            </div>
            <div className="movie_reviews_container">
                {movie.reviews ? movie.reviews.map((review, index) => (
                    <div className="movie_review_block" key={index}>
                        {
                            (() => {
                                if (review.review === "POSITIVE") {
                                    return <p key={index} className="review_line_positive"></p>;
                                } else if (review.review === "NEGATIVE") {
                                    return <p key={index} className="review_line_negative"></p>;
                                } else {
                                    return <p key={index} className="review_line_neutral"></p>;
                                }
                            })()
                        }
                        <div className="review_container">
                            <div className="review_info">
                                <h2 className="review_author">{review.author.username}</h2>
                                <h2 className="review_author">{review.title}</h2>
                                <p className="review_text">{review.text}</p>
                            </div>
                        <div className="dropdown">

                            {
                                (
                                    roles.some(role => ["ADMIN", "MODERATOR"].includes(role)
                                    || review.author === username
                                    ) && (
                                        <div>
                                            <div className="dropdown-toggle noselect" onClick={(e) => toggleDropdown(e, index)}>
                                                &#xFE19;
                                            </div>
                                            <div className="dropdown-menu" id={`dropdownMenu-${index}`}>
                                                <span className="dropdown-text">Изменить</span>
                                                <span onClick={() => deleteReview(review.id)} className="dropdown-text">Удалить</span>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    </div>
                )) : ""}
            </div>

            <div className="block-comments">
                <div className="block-create-comment">
                    <img className="comment-avatar"
                         src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
                    <form onSubmit={(e) => postComment(e)}>
                        <textarea onChange={handleChange} placeholder="Написать комментарий" className="comment-area"
                                  name="message" id="message"></textarea>
                        <button className="btn-create-comment">Отправить</button>
                    </form>
                </div>
                {movie.comments ? movie.comments.map((comment) =>
                    <div className="block-comment" key={comment.id}>
                        <img className="comment-avatar"
                             src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
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