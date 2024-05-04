import React from 'react';

const Screenshots = ({movie}) => {
    return (
        <div className="movie_info_block">
            <h1>Скриншоты</h1>
            <div className="movie_screenshots_container">
                {movie.screenshots ? movie.screenshots.map((screenshot) =>
                    <img className="movie_screenshot_image" src={screenshot} alt=""/>
                ) : ""}
            </div>
        </div>
    );
};

export default Screenshots;