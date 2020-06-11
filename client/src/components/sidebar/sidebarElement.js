import React from 'react'
import { Link } from 'react-router-dom'

const SidebarElement = (props) => {
    return(
        props.input.map((index, value) => {
            return(
                <React.Fragment key={index.index}>
                    <div style={block_style}>
                        <h1 style={sidebar_heading}>{index.heading}</h1>
                        <button style={button_style}><Link to={index.link} style={link_style}>{index.title}</Link></button>
                    </div>
                </React.Fragment>
            )
        })
    );
}

const sidebar_heading = {
    color: "white"
}

const button_style = {
    height: "50px",
    width: "200px",
    padding: "0 20px 0 20px",
    borderRadius: "5px",
    backgroundColor: "#CCCCCC"
}

const link_style = {
    fontSize: "20pt",
    fontWeight: "bold",
    textDecoration: "none"
}

const block_style = {
    flexGrow: "1",
    maxHeight: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}
export default SidebarElement