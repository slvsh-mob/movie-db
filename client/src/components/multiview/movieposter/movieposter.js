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
                <div style={box}>
                    <img 
                    src={props.poster} 
                    style={photo_style}
                    className="blurred_poster"
                    alt="Movie Poster"
                    />
                    <div style={text_effect}>
                    <p style={text_test}>{props.title}</p>
                    </div>
                </div>
            ): (
                <img 
                src={props.poster} 
                style={photo_style}
                className="unblurred_poster"
                alt="Movie Poster"
                />
            )}
        </div>
    );
}

const text_effect = {
    width: "100%",
    height: "200px",
    position: "relative",
    top: "-150px"
}

const box = {
    position: "relative",
    height: "100%",
    width: "100%"
}

const text_test = {
    fontSize: "20px",
    textAlign: "center",
    color: "white"
}

const photo_style = {
    height: "100%",
    width: "100%"
}

export default MoviePoster