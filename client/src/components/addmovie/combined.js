import React from 'react'
import { FaFileUpload } from 'react-icons/fa' 
import axios from 'axios'
import swal from 'sweetalert'

const AddMovieInput = (props) => {
    //Form Input State Variables
    const [title, setTitle] = React.useState('')
    const [year, setYear] = React.useState('')
    const [runtime, setRuntime] = React.useState('')
    const [rating, setRating] = React.useState('')
    const [director, setDirector] = React.useState('')
    const [genre, setGenre] = React.useState('')
    const [synopsis, setSynopsis] = React.useState('');

    //Photo Upload State Variables
    //File replaces need for Poster State Variable
    const [file, setFile] = React.useState(null)
    const [isfile, setIsFile] = React.useState(false)
    const [inputFile, setInputFile] = React.useState(null)

    const handleTitle = e => {
        setTitle(e.target.value)
    }
    const handleYear = e => {
        setYear(e.target.value)
    }
    const handleRuntime = e => {
        setRuntime(e.target.value)
    }
    const handleRating = e => {
        setRating(e.target.value)
    }
    const handleDirector = e => {
        setDirector(e.target.value)
    }
    const handleGenre = e => {
        setGenre(e.target.value)
    }
    const handleSynopsis = e => {
        setSynopsis(e.target.value)
    }

    const fileSelectedHandler = e => {
        setInputFile(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))
        setIsFile(true)
    }


    const handleSubmit = e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('title', title)
        formData.append('moviePoster', inputFile)
        formData.set('year', year)
        formData.set('synopsis', synopsis)
        formData.set('runtime', runtime)
        formData.set('rating', rating)
        formData.set('director', director)
        formData.set('genre', genre)

        axios({
            method: "Post",
            url: "/api/movies/",
            data: formData
        })
        .then(response => {
            console.log(response)
            swal({
                title: "New Movie Added to DB!",
                icon: "success",
                button: "Next",
            })
            .then(() => {
                window.location = "/createMovie"
            })
            
        })
        .catch(err => {
            console.log(err)
            swal({
                title: "There was an Error!",
                icon: "error",
                button: "Retry",
            })
        })

    }

    return(
    <div style={test_2}>
        <div style={div_left}>
            <div style={parent_test}>
                <div style={child_1}>
                    {isfile
                        ? <img src={file} alt="Testing" style={testk}/>
                        : <div>
                            <p style={testp}>Click Below to Upload</p>
                            <FaFileUpload style={testl}/>
                        </div>
                    }
                </div>
                <div style={child_2}>
                    <input type="file" onChange={fileSelectedHandler} id="unique_input" name="unique"/>
                    <label htmlFor="unique_input">Upload Poster</label>
                </div>
            </div>
        </div>
        <div style={div_right}>
            <div style={container}>
                    <form>
                        <div style={title_row}>
                                <p style={title_text}>Add Movie to DB</p>
                        </div>
                        <div style={row}>
                            <input type="text" style={title_line} placeholder="Movie Title" value={title} onChange={handleTitle}/>
                        </div>
                        <div style={row}>
                            <input type="number" placeholder="Year" style={test2} value={year} onChange={handleYear}></input>
                            <input type="number" placeholder="Runtime" style={test2_2} value={runtime} onChange={handleRuntime}></input>
                            <select style={test2_2} onChange={handleRating}>
                                <option default value="--Rating--" disabled>--Rating--</option>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                            </select>
                        </div>
                        <div style={row}>
                            <input type="text" placeholder="Director" style={director_style} value={director} onChange={handleDirector}/>
                            <select style={test2_2} onChange={handleGenre}>
                                <option default value="--Genre--" disabled>--Genre--</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Animation">Animation</option>
                                <option value="Biography">Biography</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Crime">Crime</option>
                                <option value="Drama">Drama</option>
                                <option value="Family">Family</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Historical">Historical</option>
                                <option value="Horror">Horror</option>
                                <option value="Musical">Musical</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Romance">Romance</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Thriller">Thriller</option>
                                <option value="War">War</option>
                                <option value="Western">Western</option>
                            </select>
                        </div>
                        <div style={row}>
                            <textarea value={synopsis} onChange={handleSynopsis} style={synopsis_input}></textarea>
                        </div>
                    </form>
                </div>
            
            <div style={btn_row}>
                    <button style={reset_btn}>Reset</button>
                    <button style={submit_btn} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
    );
}

//Poster Upload
const testp = {
    fontSize: "20pt",
    textAlign: "center"
}
const parent_test = {
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
}

const child_1 = {
    width: "300px",
    flexGrow: "9",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

const child_2 = {
    width: "300px",
    flexGrow: "1",
    backgroundColor: "#57A0D3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const testl = {
    width: "50px",
    height: "50px",
    margin: "0 125px 0 125px"
}

const testk = {
    width: "100%",
    flexGrow: "1"
}

//Form Input
const synopsis_input = {
    width: "100%"
}

const container = {
    margin: "auto"
}

const btn_row = {
    marginTop: "1vh",
    height: "7vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const reset_btn = {
    flexGrow: 1,
    maxWidth: "300px",
    backgroundColor: "#E67E22",
    fontSize: "20pt",
    borderRadius: "5px"
}

const submit_btn = {
    flexGrow: 1,
    maxWidth: "300px",
    marginLeft: "50px",
    backgroundColor: "#27AE60",
    fontSize: "20pt",
    borderRadius: "5px"
}

const title_line = {
    flexGrow: 1,
    height: "5vh",
    fontSize: "3vh"
}

const row = {
    width: "100%",
    height: "8vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const title_row = {
    width: "100%",
    height: "17vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const test2 = {
    width: "30%",
    height: "5vh",
    textAlign: "center",
    fontSize: "3vh",
    margin: "0 2% 0 2%"
}

const test2_2 = {
    width: "30%",
    height: "5vh",
    textAlign: "center",
    fontSize: "3vh",
    margin: "0 2% 0 2%"
}

const director_style = {
    width: "65%",
    height: "5vh",
    fontSize: "3vh"
}

const title_text = {
    fontSize: "5vh",
    fontWeight: "bold",
    textAlign: "center"
}


//Other
const test_2 = {
    width: "100%",
    height: "90%",
    backgroundColor: "#EEEEEE",
    borderRadius: "20px",
    padding: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
}
const div_left = {
    width: "300px",
    height: "90%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    marginRight: "100px"
}

const div_right = {
    flexGrow: "1",
    height: "100%"
}
export default AddMovieInput