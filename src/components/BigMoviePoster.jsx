import React, {useEffect, useRef, useState} from 'react';

const BigMoviePoster = ({bigMovie}) => {
    const videoRef = useRef(null)
    const handlePlayVideo = () => {
        videoRef.current.play()
    }

    return (
        <div className="featured-content">
            <video ref={videoRef} className="featured-video" autoPlay loop muted>
                {<source src={bigMovie.trailer.replace("localhost", "192.168.0.2")} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
            {console.log(bigMovie.trailer)}

            <div className="featured-overlay">
                {/*<img
                    className="featured-image"
                    src={bigMovie.}
                    alt="Description"
                    width="200"
                    height="200"
                />*/}

                <div className="featured-text">
                    <p className="featured-desc">
                        {bigMovie.description === null ? "Нет описания" : bigMovie.description.slice(0, 50)}
                    </p>
                </div>

                <button className="featured-button">WATCH</button>
            </div>
        </div>
    );
};

export default BigMoviePoster;