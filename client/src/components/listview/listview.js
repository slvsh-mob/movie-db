import React from 'react'
import ListElement from './listviewElement'

const ListView = (props) => {
    console.log(props.input)
    return(
        props.input.map((index, value) => {
            return(
                <ListElement input={index}/>
            )
        })
    )
}


export default ListView