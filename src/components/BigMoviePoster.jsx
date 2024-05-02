import zohanTrailer from "../media/Zohan.mp4"

const BigMoviePoster = ({bigMovie}) => {

    return (
        <div className="featured-content">
            <video className="featured-video" autoPlay loop muted>
                <source src={zohanTrailer} type="video/mp4" />
            </video>

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