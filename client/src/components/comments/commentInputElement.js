import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const CommentElement = (props) => {
    const [userRating, setUserRating] = React.useState('')
    const [userComment, setUserComment] = React.useState('')

    const handleRating = (e) => {
        setUserRating(e.target.value)
    }

    const handleComment = (e) => {
        setUserComment(e.target.value)
    }

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token')
        if (!token) {
            swal({
                "title": "Please Log In",
                "text": "You need to be logged in to leave a comment.",
                "icon": "warning"
            })
            return
        }

        const rating = Number(userRating)
        if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
            swal({
                "title": "Invalid Rating",
                "text": "Please enter a rating between 1 and 10.",
                "icon": "warning"
            })
            return
        }

        if (userComment.trim() === '') {
            swal({
                "title": "Empty Comment",
                "text": "Please write a comment before submitting.",
                "icon": "warning"
            })
            return
        }

        axios({
            method: "Post",
            url: "/api/comments/",
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                movieId: props.movieId,
                rating: rating,
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
                //Tell the parent page to refresh the comment list & average rating
                if (props.onCommentAdded) {
                    props.onCommentAdded()
                }
            }
        })
        .catch(error => {
            const loggedOut = error.response && error.response.status === 401
            swal({
                "title": loggedOut ? "Session Expired" : "Something Went Wrong!",
                "text": loggedOut ? "Please log in again to comment." : "Please Try Again",
                "icon": "error"
            })
            console.log(error)
        })
    }

    return(
    <div style={comment_div}>
        <div style={rating_section}>
            <div style={heading_section}>
                <p style={rating_text}>Rating (1-10)</p>
            </div>
            <div style={num_in_section}>
                <input type="number" min="1" max="10" step="1" style={num_input_style} value={userRating} onChange={handleRating}/>
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
