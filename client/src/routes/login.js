import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

//Photos
import low from '../static_images/low.jpg'
import tron from '../static_images/tron.jpg'
import fal from '../static_images/fal.jpg'
import pf from '../static_images/pf.jpg'
import dk from '../static_images/dk.jpg'
import sf from '../static_images/sf.jpg'
import fc from '../static_images/fc.jpg'
import esb from '../static_images/esb.jpg'
import joker from '../static_images/joker.jpg'
import avatar from '../static_images/avatar.jpg'
import terminator from '../static_images/terminator.jpg'
import vertigo from '../static_images/vertigo.jpg'

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
            url: '/api/user/login',
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
                    <div style={row_1}>
                        <div style={row_element}><img src={low} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={dk} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={fal} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={pf} alt="poster missing" style={photo_style}/></div>
                    </div>
                    <div style={row_1}>
                        <div style={row_element}><img src={fc} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={sf} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={esb} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={joker} alt="poster missing" style={photo_style}/></div>
                    </div>
                    <div style={row_1}>
                    <div style={row_element}><img src={avatar} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={terminator} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={vertigo} alt="poster missing" style={photo_style}/></div>
                        <div style={row_element}><img src={tron} alt="poster missing" style={photo_style}/></div>
                    </div>
                </div>
                <div style={right_div}>
                    <div style={title_row}>
                        <p style={login_title}>Movie Database</p>
                    </div>
                    <div style={middle_row}>
                        <p style={middle_text}>Welcome to the Movie database</p>
                    </div>
                    <div style={input_row}>
                        <form style={form_style}>
                            <label for="input_one">Username or Email</label>
                            <input type="text" id="input_one" value={email} style={login_input_T} onChange={handleEmail}/>
                            <label for="input_two">Password</label>
                            <input type="password" id="input_two" value={password} style={login_input_B} onChange={handlePassword}/>
                            <a href="/resetPW" style={lost_pw_style}>Forgot Password?</a>
                        </form>
                    </div>
                    <div style={lower_unit}>
                        <div style={btn_row}>
                            <button style={submit_btn} onClick={handleSubmit}>Sign In</button>
                        </div>
                        <div style={line_div}>
                            <hr style={line_style}></hr>
                            <p style={lower_unit_text}>Or</p>
                            <hr style={line_style}></hr>
                        </div>
                        <div style={btn_row}>
                            <p>New to the Movie Databse? <a href="/signup">Create an Account</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const lost_pw_style ={
    textAlign: "right"
}

const signup_btn = {
    backgroundColor: "#008ECC",
    flexGrow: 1,
    maxWidth: "300px",
    fontSize: "20pt",
    borderRadius: "5px"
}

const photo_style = {
    height: "100%",
    width: "100%"
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
    width: "30%",
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
    maxWidth: "225px",
    backgroundColor: "#696969",
    fontSize: "20pt",
    borderRadius: "25px",
    color: "white"
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
    height: "750px",
    backgroundColor: "#EEEEEE",
    position: "fixed",
    zIndex: "2",
    margin: "5% 10% 5% 10%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row"
}

const left_div = {
    width: "650px",
    height: "100%",
    backgroundColor: "#D65A31",
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 1px 5px gray"
}

const row_1 = {
    height: "250px",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row"
}

const row_element = {
    width: "25%",
    height: "100%",
    backgroundColor: "#2C3E50",
    border: "1px solid black"
}

const right_div = {
    minWidth: "470px",
    maxWidth: "900px",
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
    height: "20px",
    fontSize: "20px",
    width: "400px",
    textIndent: "10px",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid gray"
}

const login_input_T = {
    flexGrow: "1",
    margin: "0 0 20px 0",
    height: "20px",
    fontSize: "20px",
    width: "400px",
    textIndent: "10px",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid gray"
}

const title_row = {
    height: "225px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const login_title = {
    flexGrow: "1",
    fontSize: "6vh",
    textAlign: "center",
    fontFamily: "Krona One"
}

const middle_row = {
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}

const middle_text = {
    fontSize: "35px",
    lineHeight: "4vh",
    textAlign: "center",
    margin: "0 0 10px 0",
    fontFamily: "PT Sans Narrow"
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