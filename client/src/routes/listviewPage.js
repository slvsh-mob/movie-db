import React, { useEffect } from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import Listview from '../components/listview/listview'
import axios from 'axios'

const ListViewPage = () => {
    const loading = [{
        "status": "loading"
    }]

    const [data, setData] = React.useState(loading)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("/movies/")
            const path = result.data
            setData(path)
            console.log(path)
        }
        fetchData();
    }, []);

    return(
        <div className="first_page">
                <Navbar />
            <div style={row2}>
                <Sidebar />
                <div style={test2}>
                    <Listview input={data}/>
                </div>
            </div>
        </div>
    );
}

const test2 = {
    width: "80%",
    position: "absolute",
    left: "20%",
    flexGrow: "1",
    padding: "20px"
}

const row2 = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
}

export default ListViewPage