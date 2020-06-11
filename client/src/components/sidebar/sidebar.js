import React, { useEffect } from 'react'
import SidebarElement from './sidebarElement'

const Sidebar = (props) => {
    const [adminAccess, setAdminAccess] = React.useState(true)
    const [searchOption, setSearchOption] = React.useState('sidebar_div')

    useEffect(() => {
        if(props.searching === true){
            setSearchOption('sidebar_div_search')
        }else{
            setSearchOption('sidebar_div')
        }   
    }, [props.searching])

        const sidebar_links_admin = [
            {
                index: 1,
                heading: "Add New Movie",
                title: "Add Movie",
                link: "/createMovie"
            },
            {
                index: 2,
                heading: "View Multiview",
                title: "Multiview",
                link: "/multiview"
            },
            {
                index: 3,
                heading: "View Listview",
                title: "Listview",
                link: "/listview"
            }
        ]

        const sidebar_links_user = [
            {
                index: 1,
                heading: "View Multiview",
                title: "Multiview",
                link: "/multiview"
            },
            {
                index: 2,  
                heading: "View Listview",
                title: "Listview",
                link: "/listview"
            }
        ]


    return(
        <div className={searchOption}>
            {adminAccess
                ? <SidebarElement input={sidebar_links_admin} />
                : <SidebarElement input={sidebar_links_user} />
            }
        </div>
    );
}

export default Sidebar