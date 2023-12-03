import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BigMoviePoster from "./BigMoviePoster";

const MovieSlider = () => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true, // Попробуйте добавить или убрать эту опцию
        // Другие опции...
    };

    return (
        <div className="content-container">
            <BigMoviePoster fileName={"Zohan.JPG"}/>
            <div className="movie-list-container">
                <h1 className="movie-list-title">Новинки</h1>
                <div className="movie-list-wrapper">
                    <Slider {...settings}>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/14.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/11.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/5.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/8.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/4.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/18.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>

                    </Slider>
                </div>
            </div>

            <div className="movie-list-container">
                <h1 className="movie-list-title">Популярно</h1>
                <div className="movie-list-wrapper">
                    <Slider {...settings}>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/14.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/11.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/5.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/8.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/4.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/18.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>

                    </Slider>
                </div>
            </div>

            <BigMoviePoster fileName={"f-2.JPG"}/>

            <div className="movie-list-container">
                <h1 className="movie-list-title">Хуйня</h1>
                <div className="movie-list-wrapper">
                    <Slider {...settings}>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/14.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/11.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/5.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/8.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/4.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>
                        <div className="movie-list-item">
                            <img className="movie-list-item-img" src="img/18.jpg" alt=""/>
                            <span className="movie-list-item-title">Her</span>
                            <button className="movie-list-item-button">Смотреть</button>
                        </div>

                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default MovieSlider