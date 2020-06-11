import React from 'react'
import Multiview from './multiview'
import Sidebar from '../sidebar/sidebar'

const sidebar_options = {
    block1: {
        title: 'Rankings',
        subtitle: 'Options'
    },
    marginTop: {
        marginTop: "7vh"
    },
    blank: false
}

const MoviePage = () => {
    return(
        <div className="row">
            <Sidebar input={sidebar_options}/>
            <Multiview />
        </div>
    );
}

export default MoviePage