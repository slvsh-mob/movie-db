import React from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import UserProfile from '../components/userpage/userProfile'
import SearchBar from '../components/searchbar/searchbar'

//Logout function --> Clear local storage and redirect user to login page
const handleLogout = (e) => {
    localStorage.clear()
    setTimeout(() => {  window.location = "/login"; }, 1000);
}

const UserPage = () => {
    const [searching, setSearching] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleSearching = (e) => {
        setSearching(!searching)
    }

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    return(
        <div className="single_page_background">
            {searching
                ? <React.Fragment>
                    <Navbar handleSearching={handleSearching} searching={searching} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}/>
                    <SearchBar handleSearching={handleSearching} searchTerm={searchTerm}/>
                    <Sidebar searching={searching} blank="false"/>
                    <UserProfile searching={searching} searchTerm={searchTerm} handleLogout={handleLogout}/>
                  </React.Fragment>
                : <React.Fragment>
                    <Navbar handleSearching={handleSearching} searching={searching} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}/>
                    <Sidebar searching={searching} blank="false"/>
                    <UserProfile searching={searching} />
                  </React.Fragment>
                
            }
        </div>
    );
}

export default UserPage