import React from 'react'
import ListElement from './listviewElement'

const ListView = (props) => {
    console.log(props.inlet)
    return(
        props.inlet.map((index, value) => {
            return(
                <ListElement input={index}/>
            )
        })
    )
}


export default ListView