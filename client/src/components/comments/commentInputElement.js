import React, { useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const CommentElement = (props) => {
    const [movieId, setMovieId] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [userRating, setUserRating] = React.useState('')
    const [userComment, setUserComment] = React.useState('')

    const handleRating = (e) => {
        setUserRating(e.target.value)
    }

    const handleComment = (e) => {
        setUserComment(e.target.value)
    }

    useEffect(() => {
        // Set the movie ID and user ID for comment creation
        setMovieId(props.movieId)
        setUserId(localStorage.getItem('userId'))
    }, [movieId]);

    const handleSubmit = (e) => {
        axios({
            method: "Post",
            url: "/api/comments/",
            data: {
                userId: userId,
                movieId: movieId,
                rating: userRating,
                comment: userComment
            }
        })
        .then(response => {
            if (response.data.message === "Comment created"){
                swal({
                    "title": "Comment Added",
                    "text": "Thanks for the feedback!",
                    "icon": "success"
                })
                setUserComment('')
                setUserRating('')
            }
            console.log(response)
        })
        .catch(error => {
            swal({
                "title": "Something Went Wrong!",
                "text": "Please Try Again",
                "icon": "error"
            })
            console.log(error)
        })
    }

    return(
    <div style={comment_div}>
        <div style={rating_section}>
            <div style={heading_section}>
                <p style={rating_text}>Rating</p>
            </div>
            <div style={num_in_section}>
                <input type="number" style={num_input_style} value={userRating} onChange={handleRating}/>
            </div>
        </div>
        <div style={comment_section}>
            <div style={heading_section}>
                <p style={rating_text}>Comment</p>
            </div>
            <div style={num_in_section}>
                <textarea style={textarea_style} value={userComment} onChange={handleComment}></textarea>
            </div>
        </div>
        <div style={btn_section}>
            <button style={submit_btn} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    );
}

const heading_section = {
    minHeight: "30px",
    flexGrow: "1"
}

const num_in_section = {
    height: "130px",
    flexGrow: "1"
}

const submit_btn = {
    padding: "10px",
    fontSize: "25pt",
    borderRadius: "5px"
}

const btn_section = {
    flexGrow: "1",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const rating_text = {
    textAlign: "center",
    fontSize: "12pt",
    marginRight: "10px",
    margin: 0,
    lineHeight: "30px",
    fontWeight: "bold"
}

const num_input_style = {
    width: "75px",
    height: "50px",
    fontSize: "20pt",
    textAlign: "center"
}

const textarea_style = {
    width: "90%",
    height: "50px",
    marginLeft: "5%"
}

const rating_section = {
    flexGrow: "2",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const comment_section = {
    flexGrow: "7",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}
const comment_div = {
    height: "100px",
    width: "100%",
    backgroundColor: "#EEEEEE",
    marginTop: "20px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row"
}
export default CommentElement