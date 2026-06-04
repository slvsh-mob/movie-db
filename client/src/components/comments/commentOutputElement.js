import React from 'react'

//Renders the full list of comments for a movie (passed in from SingleViewPage)
const CommentList = (props) => {
    const comments = props.comments || []

    if (comments.length === 0) {
        return (
            <div style={comment_div}>
                <div style={no_comments_div}>
                    <p style={no_comments_text}>--- No Comments Found ---</p>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {comments.map(comment => (
                <div style={comment_div} key={comment._id}>
                    <div style={double_stack}>
                        <div style={rating_section_2}>
                            <div style={heading_section}>
                                <p style={rating_text}>User</p>
                            </div>
                            <div style={output_section}>
                                <p style={rating_text}>
                                    {comment.userID && comment.userID.username
                                        ? comment.userID.username
                                        : 'Anonymous'}
                                </p>
                            </div>
                        </div>
                        <div style={rating_section_2}>
                            <div style={heading_section}>
                                <p style={rating_text}>Date</p>
                            </div>
                            <div style={output_section}>
                                <p style={rating_text}>{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div style={rating_section}>
                        <div style={heading_section}>
                            <p style={rating_text}>Rating</p>
                        </div>
                        <div style={output_section_2}>
                            <p style={rating_text}>{comment.rating} / 10</p>
                        </div>
                    </div>
                    <div style={comment_section}>
                        <div style={heading_section}>
                            <p style={rating_text}>Comment</p>
                        </div>
                        <div style={output_section_2}>
                            <p style={rating_text}>{comment.comment}</p>
                        </div>
                    </div>
                </div>
            ))}
        </React.Fragment>
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
    minHeight: "125px",
    width: "100%",
    backgroundColor: "#EEEEEE",
    marginTop: "20px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}
export default CommentList
