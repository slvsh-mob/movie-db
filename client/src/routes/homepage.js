import React from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import SearchBar from '../components/searchbar/searchbar'
import axios from 'axios'

const HomePage = () => {
    const [searching, setSearching] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const handleSearching = (e) => {
        setSearching(!searching)
    }

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        setLoading(true)
        setSearching(!searching)
        e.preventDefault()
        var temp_term = "/api/movies/title/" + searchTerm
        axios({
            method: "Get",
            url: temp_term
        })
        .then(response => {
            const path = response.data
            const len_data = path.length
            console.log(len_data + " Objects Returned")
            console.log(path)
            setData(path)
            setLoading(false)
            //If response has data, redirect to singleview with data loaded
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            //If resoonse has no data, present error and allow user to retry
        })
    }

    return(
        <div className="single_page_background">
            {searching
                ? <React.Fragment>
                    <Navbar handleSubmit={handleSubmit} handleSearching={handleSearching} searching={searching} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}/>
                    <SearchBar loading={loading} handleSearching={handleSearching} searchTerm={searchTerm} data={data}/>
                    <Sidebar searching={searching} />
                  </React.Fragment>
                : <React.Fragment>
                    <Navbar handleSubmit={handleSubmit} handleSearching={handleSearching} searching={searching} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}/>
                    <Sidebar searching={searching} />
                  </React.Fragment>
            }
        </div>
    );
}

export default HomePage