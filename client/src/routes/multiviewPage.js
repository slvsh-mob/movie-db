import React from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import MultiView from '../components/multiview/multiview/multiview'


const sidebar_options = {
    marginTop: {
        marginTop: "2vh"
    },
    blank: false,
    blocks: {
        item1: {
            title: "Add Movie",
            link: "/createMovie"
        },
        item2: {
            title: "List View",
            link: "/listview"
        },
        item3: {
            title: "Multi View",
            link: "/multiview"
        },
        item4: {
            title: "Single View",
            link: "/singleview"
        }
    }
}

const MultiViewPage = () => {
    const [items, setItems] = React.useState({
        item1: {
            title: "Shawshank Redemption",
        },
        item2: {
            title: "The Godfather"
        },
        item3: {
            title: "The Godfather Part II"
        },
        item4: {
            title: "The Dark Knight"
        },
        item5: {
            title: "12 Angry Men"
        },
        item6: {
            title: "Lord of the Rings, Return of the King"
        },
        item7: {
            title: "Schindlers List"
        },
        item8: {
            title: "Pulp Fiction"
        },
        item9: {
            title: "The Good, The Bad and The Ugly"
        },
        item10: {
            title: "Lord of the Rings, Fellowship of the Ring"
        }
    })
    
    return(
        <React.Fragment>
            <Navbar />
            <Sidebar input={sidebar_options}/>
            <MultiView input={items}/>
        </React.Fragment>
    );
}

export default MultiViewPage