import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const ListviewElement = (props) => {
    return(
        <div className="list_element" onClick={() => {window.location = 'http://localhost:3000/singleview/' + props.input._id}}>
            <div style={left_area}>
                <img src={props.input.Poster} alt="Movie Poster Missing"  style={poster_style}/>
            </div>
            <div style={center_area}>
                <div style={small_buffer}></div>
                <p className="title_text">{props.input.Title}</p>
            </div>
            <div style={right_area}>
                <div style={star_div}>
                <div style={med_buffer}></div>
                    <AiFillStar style={rating_star}/>
                </div>
                <div style={rating_div}>
                <div style={med_buffer}></div>
                    <p style={rating_text}>8.4</p>
                </div>
            </div>
        </div>
        );
    }

const poster_style = {
    height: "130px",
    width: "100px",
    margin: 0
}

const left_area = {
    height: "100%",
    minWidth: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const center_area = {
    height: "100%",
    flexGrow: "1"
}

const right_area = {
    height: "100%",
    width: "150px",
    display: "flex",
    flexDirection: "row"
}

const small_buffer = {
    height: "25px"
}

const med_buffer = {
    height: "50px"
}

const rating_text = {
    fontSize: "30pt",
    lineHeight: "50px",
    margin: 0
}

const rating_star = {
    height: "50px",
    width: "50px"
}

const star_div = {
    width: "50px",
    height: "100%",
}

const rating_div = {
    width: "100px",
    height: "100%",
    textAlign: "center"
}

export default ListviewElement