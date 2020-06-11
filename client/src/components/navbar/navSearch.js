import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const NavSearch = (props) => {

    return(
    <React.Fragment>
        <form style={form_style}>
            <div style={left_div}>
                <input type="text" placeholder="Search" style={navSearch_style} onChange={props.handleSearchTerm}/>
            </div>
        </form>
        <div style={right_div}>
            <AiOutlineSearch style={search_btn} onClick={props.handleSubmit}/>
        </div>
    </React.Fragment>
    );
}

const form_style = {
    width: "100%",
    height: "100%"
}

const search_btn = {
    height: "4vh",
    width: "4vh",
    marginTop: "2vh",
    marginLeft: "1vw",
    color: "white"
}

const left_div = {
    flexGrow: "1",
    height: "100%",
    display: "flex"
}

const right_div = {
    width: "50px",
    height: "100%"
}

const navSearch_style = {
    height: "4.5vh",
    flexGrow: "1",
    marginTop: "1.5vh",
    borderRadius: "10px",
    fontSize: "2vh"
}

export default NavSearch