import React, { useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import CommentInElement from '../comments/commentInputElement'
import CommentOutElement from '../comments/commentOutputElement'

const SingleViewPage = (props) => {
    const [id, setId] = React.useState(props.query)
    const [title, setTitle] = React.useState('')
    const [poster, setPoster] = React.useState('')
    const [year, setYear] = React.useState('')
    const [synopsis, setSynopsis] = React.useState('')
    const [runtime, setRuntime] = React.useState('')
    const [rating, setRating] = React.useState('')
    const [director, setDirector] = React.useState('')
    const [genre, setGenre] = React.useState('')

    useEffect(() => {
        const fetchData = async () => {
            const temp_string = "/api/movies/id/" + id
            const result = await axios(temp_string)
            const path = result.data
            setId(path._id)
            setTitle(path.Title)
            setPoster(path.Poster)
            setYear(path.Year)
            setSynopsis(path.Synopsis)
            setRuntime(path.Runtime)
            setRating(path.Rating)
            setDirector(path.Director)
            setGenre(path.Genre)
        }
        fetchData();
    }, [id]);


    return(
        <div className="singleview_style">
            <div style={test_2}>
                <div style={left_div}>
                    <img src={poster} alt="Movie Poster Missing" style={poster_style}/>
                </div>
                <div style={right_div}>
                    <div style={container}>
                        <div style={top_line}>
                            <div style={title_div}>
                                <p style={single_text}>{title}</p>
                            </div>
                            <div style={rating_div}>
                                <AiFillStar  style={star_style}/>
                                <p style={single_text}>8.4</p>
                            </div>
                        </div>
                            <div style={row}>
                                <div style={row_inner}>
                                    <p>Year:</p>
                                    <p style={trio_text}>{year}</p>
                                </div>
                                <div style={row_inner}>
                                    <p>Runtime:</p>
                                    <p style={trio_text}>{runtime}</p>
                                </div>
                                <div style={row_inner}>
                                    <p>Rating:</p>
                                    <p style={trio_text}>{rating}</p>
                                </div>
                            </div>

                            <div style={row}>
                                <div style={row_inner}>
                                    <p>Director:</p>
                                    <p style={duo_text}>{director}</p>
                                </div>
                                <div style={row_inner}>
                                    <p>Genre:</p>
                                    <p style={duo_text}>{genre}</p>
                                </div>
                            </div>
                            <div style={row_large}>
                                <div style={single_label}>
                                    <p>Synopsis:</p>
                                </div>
                                <div style={single_desc}>
                                    <p>{synopsis}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <CommentInElement movieId={id} />
            <CommentOutElement movieId={id} />

        </div>
    );
}

const star_style = {
    marginRight: "8px"
}

const top_line = {
    flexGrow: "1",
    minHeight: "4vh",
    fontSize: "3vh",
    display: "flex"
}

const row_inner = {
    flexGrow: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

const row_large = {
    minHeight: "8vh",
    width: "100%",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column"
}

const title_div = {
    flexGrow: "8",
    minHeight: "4vh",
    fontSize: "3vh"
}

const rating_div = {
    flexGrow: "2",
    minHeight: "4vh",
    fontSize: "3vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const container = {
    margin: "auto",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column"
}

const poster_style = {
    width: "100%",
    height: "100%",
    minWidth: "300px"
}
const single_label = {
    flexGrow: "1"
}

const single_desc = {
    flexGrow: "9"
}

const duo_text = {
    flexGrow: "1",
    fontSize: "3vh"
}

const single_text = {
    flexGrow: "1",
    fontSize: "4vh"
}

const trio_text = {
    flexGrow: "1",
    fontSize: "3vh"
}

const test_2 = {
    width: "100%",
    height: "500px",
    backgroundColor: "#EEEEEE",
    borderRadius: "20px",
    padding: "5%",
    display: "flex",
    flexDirection: "row"
}

const left_div = {
    width: "300px",
    height: "100%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    marginRight: "75px"
}

const right_div = {
    flexGrow: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column"
}

const row = {
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

export default SingleViewPage