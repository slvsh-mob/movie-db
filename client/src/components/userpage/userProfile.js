import React, { useEffect } from 'react'

const UserProfile = (props) => {
    const [searchOption, setSearchOption] = React.useState('main_page_div')

    useEffect(() => {
        if(props.searching === true){
            setSearchOption('main_page_div_search')
        }else{
            setSearchOption('main_page_div')
        }   
    }, [props.searching])

    return(
        <div className={searchOption}>
            <div style={card}>
                <p style={title}>Welcome to the Movie Database</p>
                <p style={row}>Your Username Is:</p>
                <p style={row}>{localStorage.getItem("username")}</p>
                <p style={row}>Your User ID Is:</p>
                <p style={row}>{localStorage.getItem("userId")}</p>
                <p style={row}>Logout</p>
                <button className="logout_btn" onClick={props.handleLogout}>Logout</button>
            </div>
        </div>
    );
}

const row = {
    flexGrow: "2",
    minHeight: "40px",
    fontSize: "15pt"
}

const title = {
    fontSize: "35pt",
    fontWeight: "bold",
    flexGrow: "4",
    textAlign: "center"
}

const card = {
    width: "800px",
    height: "700px",
    backgroundColor: "#EEEEEE",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "0 75px 0 75px"
}

export default UserProfile