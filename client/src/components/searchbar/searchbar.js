import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GrNext } from 'react-icons/gr'
import { GrPrevious } from 'react-icons/gr'

const SearchBar = (props) => {

    return(
        <div style={searchbar_style}>
            <div style={search_term_section}>
                <p style={search_term_label}>Search Term:</p>
                <p style={search_term_style}>{props.searchTerm}</p>
            </div>
            <div style={results_section}>
                {props.loading
                    ? <div>
                        <p>--Loading--</p>
                    </div>
                    : <React.Fragment>
                        {props.data.length === 1 &&
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[0]._id}}>
                                <img src={props.data[0].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                        }
                        {props.data.length === 2 &&
                        <React.Fragment>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[0]._id}}>
                                <img src={props.data[0].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[1]._id}}>
                                <img src={props.data[1].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                        </React.Fragment>
                        }
                        {props.data.length === 3 &&
                        <React.Fragment>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[0]._id}}>
                                <img src={props.data[0].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[1]._id}}>
                                <img src={props.data[1].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[2]._id}}>
                                <img src={props.data[2].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                        </React.Fragment>
                        }
                        {props.data.length === 4 &&
                        <React.Fragment>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[0]._id}}>
                                <img src={props.data[0].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[1]._id}}>
                                <img src={props.data[1].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[2]._id}}>
                                <img src={props.data[2].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[3]._id}}>
                                <img src={props.data[3].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                        </React.Fragment>
                        }
                        {props.data.length === 5 &&
                        <React.Fragment>
                            <div style={button_section_pag}>
                            <GrPrevious style={pag_button}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[0]._id}}>
                                <img src={props.data[0].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[1]._id}}>
                                <img src={props.data[1].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[2]._id}}>
                                <img src={props.data[2].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[3]._id}}>
                                <img src={props.data[3].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={results_element} onClick={() => {window.location = "/singleview/" + props.data[4]._id}}>
                                <img src={props.data[4].Poster} alt="Poster Missing" style={poster_style}/>
                            </div>
                            <div style={button_section_pag}>
                                <GrNext style={pag_button}/>
                            </div>
                        </React.Fragment>
                        }
                      </React.Fragment>
                }
            </div>
            <div style={button_section}>
                <AiOutlineClose  style={close_btn_style} onClick={props.handleSearching}/>
            </div>
        </div>
    );
}

const poster_style = {
    width: "100%",
    height: "100%"
}

const pag_button = {
    backgroundColor: "white",
    height: "75px",
    width: "50px"
}

const results_element = {
    width: "150px",
    height: "90%",
    backgroundColor: "gray",
    margin: "0 5px 0 5px"
}

const search_term_label = {
    fontSize: "15px",
    color: "white"
}

const search_term_section = {
    flexGrow: "1",
    maxWidth: "200px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "20px",
    borderRight: "1px solid white"
}

const results_section = {
    flexGrow: "8",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const button_section = {
    flexGrow: "1",
    maxWidth: "50px",
    height: "100%"
}

const button_section_pag = {
    flexGrow: "1",
    maxWidth: "50px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 5px 0 5px"
}

const search_term_style = {
    color: "white",
    fontSize: "20pt",
    lineHeight: "30px"
}

const close_btn_style = {
    color: "white",
    height: "40px",
    width: "40px",
    float: "right",
    margin: "0 5px 0 160px"
}

const searchbar_style = {
    height: "200px",
    width: "100%",
    position: "absolute",
    top: "8vh",
    zIndex: 3,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

export default SearchBar