import React, { useEffect } from 'react'
import MoviePoster from '../movieposter/movieposter';
import axios from 'axios'

const MultiView = (props) => {
    const [currBlock, setCurrBlock] = React.useState(0)
    const [numChunks, setNumChunks] = React.useState(0)
    const [searchOption, setSearchOption] = React.useState('multiview_div')
    //const [remainder, setRemainder] = React.useState(0)

    const [chunks, setChunks] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)

    const chunk = async (array, chunkSize) => {
        const chunked_array = [];
        let index = 0;
        while (index < array.length){
            chunked_array.push(array.slice(index, chunkSize + index));
            index += chunkSize;
        }
        setChunks(chunked_array)
    }

    const block_manager = (input) => {
        if (input === "plus"){
            if(currBlock === (numChunks - 2)){
                setCurrBlock(0)
            }else{
                setCurrBlock(currBlock + 1)
            }
        }
        if (input === "minus"){
            if(currBlock === 0){
                setCurrBlock(numChunks - 2)
            }else{
                setCurrBlock(currBlock - 1)
            }
        }
    }

    //Search Styling
    useEffect(() => {
        if(props.searching === true){
            setSearchOption('multiview_div_search')
        }else{
            setSearchOption('multiview_div')
        }   
    }, [props.searching])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("/api/movies/")

            //const items = result.data.length;
            setNumChunks((result.data.length) / 5)
            //setRemainder(items % 5)

            const chunk_result = await chunk(result.data, 5)
            setIsLoading(false)
        }
        fetchData();
    }, [chunks]);

    const handleUpClick = (e) => {
        block_manager('plus')
    }
    const handleDownClick = (e) => {
        block_manager('minus')
    }

    return(
        <div className={searchOption}>
            <div className="multiview_top_buffer"></div>
            <div className="multiview_area">
                <div className="multiview_top_buffer"></div>
                {isLoading
                    ? <div className="multiview_row"> -- Loading -- </div>
                    : <div className="multiview_row">{chunks[currBlock].map((index, value) => (
                        <MoviePoster poster={index.Poster} title={index.Title} _id={index._id} class="multiview_element" key={index._id}/>
                    ))}</div>
                }
                <div className="multiview_top_buffer"></div>
                <div style={btn_row}>
                    <button onClick={handleDownClick} style={btn_style}>Prev</button>
                    <button onClick={handleUpClick} style={btn_style}>Next</button>
                </div>
                <div className="multiview_top_buffer"></div>
                {isLoading
                    ? <div className="multiview_row"> -- Loading -- </div>
                    : <div className="multiview_row">{chunks[(currBlock + 1)].map((index, value) => (
                        <MoviePoster poster={index.Poster} title={index.Title} _id={index._id} class="multiview_element" key={index._id}/>
                    ))}</div>
                }
            </div>
        </div>
    );
}

const btn_row = {
    height: "75px",
    width: "100%",
    display: "flex",
    justifyContent: "center"
}

const btn_style = {
    width: "150px",
    borderRadius: "5px",
    fontSize: "25pt",
    margin: "0 10px"
}

export default MultiView