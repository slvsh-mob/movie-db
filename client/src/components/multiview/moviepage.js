import React from 'react'
import Multiview from './multiview'
import Sidebar from '../sidebar/sidebar'

const MoviePage = () => {
    return(
        <div className="row">
            <Sidebar />
            <Multiview />
        </div>
    );
}

export default MoviePage