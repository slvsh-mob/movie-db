import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import NavSearch from './navSearch'
import NavUser from './navUser'

const handleClick = e => {
    document.location.href="/homepage"
}

const Navbar = (props) => {
    return(
        <div className="navbar_div">
            <div className="navbar_icon">
                <AiFillHome className="home_button" onClick={handleClick}/>
            </div>
            <div className="navbar_search">
                <NavSearch handleSubmit={props.handleSubmit} handleSearching={props.handleSearching} searching={props.searching} handleSearchTerm={props.handleSearchTerm} searchTerm={props.searchTerm}/>
            </div>
            <div className="navbar_user">
                <NavUser />
            </div>

        </div>
    );
}

export default Navbar