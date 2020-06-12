import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const LoginPage = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirm_password, setConfirmPassword] = React.useState('')
    const [f_name, setFName] = React.useState('')
    const [l_name, setLName] = React.useState('')
    const [email, setEmail] = React.useState('')


    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    const handleFName = e => {
        setFName(e.target.value)
    }
    const handleLName = e => {
        setLName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const checkPassword = () => {
        if (password === confirm_password){
            return true
        }
        else{
            return false
        }
    }

    const handleSubmit = e => {
        const check1 = checkPassword()
        if (check1){
            axios({
                method: 'Post',
                url: '/api/user/signup',
                data: {
                    email: email,
                    username: username,
                    firstname: f_name,
                    lastname: l_name,
                    password: password
                }
            })
            .then(response => {
                console.log(response)
                swal({
                    title: "New User Registered",
                    text: "Please Sign In",
                    icon: "success",
                  })
                .then(() => {
                    window.location = "/login"
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            swal(
                "No Match",
                "Passwords do not match!",
                "error"
            )
        }
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
                        <p style={middle_text}>Signup Below:</p>
                    </div>
                    <div style={input_row}>
                        <form>
                            <div style={row}>
                                <input type="text" placeholder="First Name" value={f_name} style={login_input_2_L} onChange={handleFName}/>
                                <input type="text" placeholder="Last Name" value={l_name} style={login_input_2_R} onChange={handleLName}/>
                            </div>
                            <div style={row}>
                                <input type="text" placeholder="Email" value={email} style={login_input} onChange={handleEmail}/>
                            </div>
                            <div style={row}>
                                <input type="text" placeholder="Username" value={username} style={login_input} onChange={handleUsername}/>
                            </div>
                            <div style={row}>
                                <input type="password" placeholder="Password" value={password} style={login_input} onChange={handlePassword}/>
                            </div>
                            <div style={row}>
                                <input type="password" placeholder="Confirm Password" value={confirm_password} style={login_input} onChange={handleConfirmPassword}/>
                            </div>
                        </form>
                    </div>
                    <div style={lower_unit}>
                        <button style={submit_btn} onClick={handleSubmit}>Signup</button>
                    </div>
                    <div style={small_buffer}></div>
                </div>
            </div>
        </div>
    );
}

const input_row = {
    flexGrow: "5",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const lower_unit = {
    flexGrow: "3",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const submit_btn = {
    flexGrow: "1",
    maxWidth: "300px",
    backgroundColor: "#27AE60",
    fontSize: "20pt",
    borderRadius: "5px"
}

const small_buffer = {
    height: "5vh"
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

const login_input = {
    flexGrow: "1",
    maxWidth: "325px",
    height: "5vh",
    fontSize: "2.5vh",
    textIndent: "10px"
}

const row = {
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
}

const title_row = {
    flexGrow: "2",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const login_title = {
    fontSize: "6vh",
    fontWeight: "bold",
    width: "80%",
    marginLeft: "10%",
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
    lineHeight: "2vh",
    textAlign: "center",
    margin: "0 0 10px 0"
}

const login_input_2_L = {
    flexGrow: "1",
    maxWidth: "200px",
    margin: "0 2% 0 2%",
    height: "5vh",
    fontSize: "2.5vh",
    textIndent: "10px"
}

const login_input_2_R = {
    flexGrow: "1",
    maxWidth: "200px",
    margin: "0 2% 0 2%",
    height: "5vh",
    fontSize: "2.5vh",
    textIndent: "10px"
}

export default LoginPage