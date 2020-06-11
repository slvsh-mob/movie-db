import React, { useEffect } from 'react'
import axios from 'axios'

const CommentElement = (props) => {
    const [movieId, setMovieId] = React.useState(props.movieId)
    const [userId, setUserId] = React.useState(localStorage.getItem('userId'))
    const [userRating, setUserRating] = React.useState('')
    const [userComment, setUserComment] = React.useState('')
    const [commentDate, setCommentDate] = React.useState('')
    const [noData, setNoData] = React.useState(true)


    useEffect(() => {
        const endpoint = "http://localhost:5000/comments/movie/" + movieId
        const fetchData = async () => {
            const result = await axios(endpoint)
            const path = result.data
            //Check if more than 1 comment exists
            if(path.length > 0){
                setUserRating(result.data[0].rating)
                setUserComment(result.data[0].comment)
                setCommentDate(result.data[0].date)
                setNoData(false)
            }
        }
        fetchData();
    }, [movieId]);

    return(
    <div style={comment_div}>
        {noData
            ? <React.Fragment>
                <div style={no_comments_div}>
                    <p style={no_comments_text}>--- No Comments Found ---</p>
                </div>
              </React.Fragment>
            : <React.Fragment>
                <div style={double_stack}>
                    <div style={rating_section_2}>
                        <div style={heading_section}>
                            <p style={rating_text}>User</p>
                        </div>
                        <div style={output_section}>
                            <p style={rating_text}>{userId}</p>
                        </div>
                    </div>
                    <div style={rating_section_2}>
                        <div style={heading_section}>
                            <p style={rating_text}>Date</p>
                        </div>
                        <div style={output_section}>
                            <p style={rating_text}>{commentDate}</p>
                        </div>
                    </div>
                </div>
                <div style={rating_section}>
                    <div style={heading_section}>
                        <p style={rating_text}>Rating</p>
                    </div>
                    <div style={output_section_2}>
                        <p style={rating_text}>{userRating}</p>
                    </div>
                </div>
                <div style={comment_section}>
                    <div style={heading_section}>
                        <p style={rating_text}>Comment</p>
                    </div>
                    <div style={output_section_2}>
                        <p style={rating_text}>{userComment}</p>
                    </div>
                </div>
              </React.Fragment>
        }
    </div>
    );
}

const no_comments_div = {
    flexGrow: "1"
}

const no_comments_text = {
    textAlign: "center",
    fontSize: "20pt"
}

const rating_section_2 = {
    flexGrow: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const output_section = {
    height: "30px"
}
const output_section_2 = {
    minHeight: "30px",
    flexGrow: "1"
}

const double_stack ={
    flexGrow: "2",
    height: "100%",
    display: "flex",
    flexDirection: "column"
}

const heading_section = {
    minHeight: "30px",
    flexGrow: "1"
}

const rating_text = {
    textAlign: "center",
    fontSize: "12pt",
    marginRight: "10px",
    margin: 0,
    lineHeight: "30px",
    fontWeight: "bold"
}

const rating_section = {
    flexGrow: "1",
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
    justifyContent: "center",
    alignItems: "center"
}
const comment_div = {
    height: "125px",
    width: "100%",
    backgroundColor: "#EEEEEE",
    marginTop: "20px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}
export default CommentElement