import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        axios({
            method: 'Post',
            url: '/user/login',
            data: {
                email: email,
                password: password
            }
        })
        .then(response => {
            console.log(response)
            if(response.data.message === "Authorization Successful"){
                //Save token to local storage for authentication
                localStorage.setItem('token', response.data.token)
                //Save userId and email to local storage
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('accessLevel', "admin")
                //Redirect to homepage on success
                window.location = "/user"
                //console.log(localStorage.getItem('email'))
                //console.log(localStorage.getItem('userId'))
                //console.log(localStorage.getItem('token'))
            }
            else{
                swal({
                    "title": "Error",
                    "text": "No User Found, Please Try Again",
                    "icon": "error"
                })
            }
        })
        .catch(error => {
            //Redirect to failed login page
            swal({
                "title": "Error",
                "text": "No User Found, Please Try Again",
                "icon": "error"
            })
            console.log(error)
        })
    }

    return(
        <div className="single_page_background">
            <div style={login_div}>
                <div style={left_div}>

                </div>
                <div style={right_div}>
                    <div style={title_row}>
                        <p style={login_title}>Movie Database</p>
                    </div>
                    <div style={middle_row}>
                        <p style={middle_text}>Welcome to the Movie database</p>
                        <p style={middle_text}>Please Sign In:</p>
                    </div>
                    <div style={input_row}>
                        <form style={form_style}>
                            <input type="text" placeholder="Email" value={email} style={login_input_T} onChange={handleEmail}/>
                            <input type="password" placeholder="Password" value={password} style={login_input_B} onChange={handlePassword}/>
                        </form>
                    </div>
                    <div style={lower_unit}>
                        <div style={btn_row}>
                            <button style={submit_btn} onClick={handleSubmit}>Login</button>
                        </div>
                        <div style={line_div}>
                            <hr style={line_style}></hr>
                            <p style={lower_unit_text}>Or</p>
                            <hr style={line_style}></hr>
                        </div>
                        <div style={btn_row}>
                            <button style={submit_btn} onClick={() => window.location = "/signup"}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const form_style = {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column"
}

const lower_unit_text = {
    fontSize: "15pt",
    width: "10%",
    textAlign: "center"
}

const line_style = {
    width: "45%",
}

const line_div = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"

}
const lower_unit = {
    flexGrow: "5",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
}

const submit_btn = {
    flexGrow: 1,
    maxWidth: "300px",
    backgroundColor: "#27AE60",
    fontSize: "20pt",
    borderRadius: "5px"
}

const btn_row = {
    marginTop: "1vh",
    height: "7vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const login_div = {
    width: "80%",
    height: "80%",
    backgroundColor: "#EEEEEE",
    position: "fixed",
    zIndex: "2",
    margin: "5% 10% 5% 10%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row"
}

const left_div = {
    flexGrow: "1",
    height: "100%",
    backgroundColor: "#D65A31"
}

const right_div = {
    minWidth: "470px",
    maxWidth: "700px",
    flexGrow: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

const login_input_B = {
    flexGrow: "1",
    margin: "0 0 10px 0",
    height: "5vh",
    fontSize: "3vh",
    width: "400px",
    textIndent: "10px"
}

const login_input_T = {
    flexGrow: "1",
    margin: "0 0 10px 0",
    height: "5vh",
    fontSize: "3vh",
    width: "400px",
    textIndent: "10px"
}

const title_row = {
    flexGrow: "2",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const login_title = {
    flexGrow: "1",
    fontSize: "6vh",
    fontWeight: "bold",
    textAlign: "center"
}

const middle_row = {
    flexGrow: "2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

const middle_text = {
    fontSize: "2vh",
    lineHeight: "4vh",
    textAlign: "center",
    margin: "0 0 10px 0"
}

const input_row = {
    flexGrow: "5",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

export default LoginPage