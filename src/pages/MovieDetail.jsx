import React, {useEffect, useState} from 'react';
import "../styles/style.css"
import MovieService from "../service/MovieService";
import {useParams} from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import MovieInfo from "../components/moviedetail/MovieInfo";
import Screenshots from "../components/moviedetail/Screenshots";
import Review from "../components/moviedetail/Review";
import Comments from "../components/moviedetail/Comments";

const MovieDetail = () => {
    let [movie, setMovie] = useState([]);
    let params = useParams();

    const username = localStorage.getItem("username")
    const roles = localStorage.getItem("roles").split(",")


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

            <MovieInfo movie={movie} roles={roles} username={username} />

            <Screenshots movie={movie}/>

            <br/><br/>
            <h1 style={{textAlign: "center"}}>тут видос</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <Modal review={review} active={modalActive} setActive={setModalActive} setReview={setReview}/>

            <Review movie={movie} roles={roles} username={username} setModalActive={setModalActive} />

            <Comments movie={movie} params={params} username={username}/>
        </div>
    );
};

export default MovieDetail;