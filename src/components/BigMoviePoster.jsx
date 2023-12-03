import React from 'react';

const BigMoviePoster = (fileName) => {
    return (
        <div className="featured-content"
             style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('img/${fileName.fileName}')` }}>
            <img className="featured-title" src="img/f-t-1.png" alt="" />
            <p className="featured-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor
                deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis
                minima voluptatibus incidunt. Accusamus, provident.</p>
            <button className="featured-button">WATCH</button>
        </div>
    );
};

export default BigMoviePoster;