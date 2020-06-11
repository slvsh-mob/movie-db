import React, { useState, Fragment } from 'react'

const MoviePoster = (props) => {
    const [isBlurred, setIsBlurred] = useState(false);

    const handleClick = () => {
        window.location = "/singleview/" + props._id
    }
    return(
        <div 
         className={props.class}
         onMouseEnter={() => setIsBlurred(true)}
         onMouseLeave={() => setIsBlurred(false)}
         onClick={handleClick}
         >
            {isBlurred ? (
                <Fragment>
                    <img 
                    src={props.poster_picture} 
                    style={photo_style}
                    className="blurred_poster"
                    alt="Movie Poster"
                    />
                    <p style={text_test}>{props.title}</p>
                </Fragment>
            ): (
                <img 
                src={props.poster_picture} 
                style={photo_style}
                className="unblurred_poster"
                alt="Movie Poster"
                />
            )}
        </div>
    );
}

const text_test = {
    position: "relative",
    top: "-60%",
    fontSize: "20px",
    textAlign: "center",
    maxWidth: "225px",
    color: "white"
}

const photo_style = {
    height: "100%",
    width: "100%"
}

export default MoviePoster