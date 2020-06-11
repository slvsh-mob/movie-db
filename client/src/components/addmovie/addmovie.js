import React, { useEffect } from 'react'
import Combined from './combined'

const AddMovie = (props) => {
    const [file, setFile] = React.useState(null)
    const [isfile, setIsFile] = React.useState(false)
    const [searchOption, setSearchOption] = React.useState('add_movie_div')

    const fileSelectedHandler = e => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setIsFile(true)
    }

    useEffect(() => {
        if(props.searching === true){
            setSearchOption('add_movie_div_search')
        }else{
            setSearchOption('add_movie_div')
        }   
    }, [props.searching])

    return(
        <div className={searchOption}>
            <div style={test_2}>
                <Combined />
            </div>
        </div>
    );
}

const test_2 = {
    width: "100%",
    height: "90%",
    backgroundColor: "#EEEEEE",
    borderRadius: "20px",
    padding: "5%"
}

export default AddMovie