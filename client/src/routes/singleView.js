import React from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import Singleview from '../components/singleview/singleview'



const SingleView = (props) => {
    const qp = props.match.params.movieId

    return(
        <div>
            <Navbar />
            <Sidebar />
            <Singleview query={qp}/>
        </div>
    )
}

export default SingleView