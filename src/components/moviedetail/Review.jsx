import React from 'react';
import axios from "axios";

const Review = ({movie, roles, username, setModalActive}) => {
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

    function deleteReview(reviewId) {
        const answer = window.confirm("Вы точно хотите удалить рецензию?");
        if (answer) {
            axios.delete("http://localhost:8080/api/review/" + reviewId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            window.location.reload()
        } else {

        }
    }

    function putReview(reviewId) {
        axios.put()
    }



    return (
        <div>
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
                                                    <span onClick={putReview} className="dropdown-text">Изменить</span>
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
        </div>
    );
};

export default Review;