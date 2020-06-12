import React, { useEffect } from 'react'
import MoviePoster from '../movieposter/movieposter';
import axios from 'axios'

const MultiView = (props) => {
    const [block1, setBlock1] = React.useState('')
    const [block2, setBlock2] = React.useState('')
    const [block3, setBlock3] = React.useState('')
    const [block4, setBlock4] = React.useState('')
    const [block5, setBlock5] = React.useState('')
    const [block6, setBlock6] = React.useState('')
    const [block7, setBlock7] = React.useState('')
    const [block8, setBlock8] = React.useState('')
    const [block9, setBlock9] = React.useState('')
    const [block10, setBlock10] = React.useState('')

    const [currBlock, setCurrBlock] = React.useState(0)
    const [numChunks, setNumChunks] = React.useState(0)
    const [remainder, setRemainder] = React.useState(0)

    const [dataRaw, setDataRaw] = React.useState(0)
    const [chunks, setChunks] = React.useState(0)
    const [chunkSize, setChunkSize] = React.useState(5)

    //Issue I Am Having//
    //Want to update block1-block10 when currBlock number is updated//
    //Seems to be a lag between writing to chunks using setChunks and chunks being defined//

    const chunk = (array) => {
        const chunked_array = [];
        let index = 0;
        while (index < array.length){
            chunked_array.push(array.slice(index, chunkSize + index));
            index += chunkSize;
        }
        return chunked_array 
    }

    const block_manager = (input) => {
        if (input === "plus"){
            var increment = currBlock + 1
            setCurrBlock(increment)
            parseInput(chunks)
        }
        if (input === "minus"){
            var decrement = currBlock - 1
            setCurrBlock(decrement)
            parseInput(chunks)
        }
    }

    const parseInput = (array) => {
        setBlock1(array[currBlock][0])
        setBlock2(array[currBlock][1])
        setBlock3(array[currBlock][2])
        setBlock4(array[currBlock][3])
        setBlock5(array[currBlock][4])
        setBlock6(array[currBlock + 1][0])
        setBlock7(array[currBlock + 1][1])
        setBlock8(array[currBlock + 1][2])
        setBlock9(array[currBlock + 1][3])
        setBlock10(array[currBlock + 1][4])
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("/api/movies/")
            const items = result.data.length;
            setNumChunks(items / 5)
            setRemainder(items % 5)

            //console.log(result.data)
            setDataRaw(result.data)

            const test = chunk(result.data, 5)
            setChunks(test)
            parseInput(test)
            //parseInput(test)
        }
        fetchData();
    }, []);

    const handleClick = (e) => {
        block_manager('plus')
    }

    return(
        <div className="multiview_style">
            <div className="multiview_top_buffer"></div>
            <div className="multiview_area">
                <div className="multiview_top_buffer"></div>
                <div className="multiview_row">
                    <MoviePoster poster_picture={block1.Poster} title={block1.Title} _id={block1._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block2.Poster} title={block2.Title} _id={block2._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block3.Poster} title={block3.Title} _id={block3._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block4.Poster} title={block4.Title} _id={block4._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block5.Poster} title={block5.Title} _id={block5._id} class="multiview_element"/>
                </div>
                <div style={btn_row}>
                    <button onClick={handleClick}>Next</button>
                </div>
                <div className="multiview_top_buffer"></div>
                <div className="multiview_row">
                    <MoviePoster poster_picture={block6.Poster} title={block6.Title} _id={block6._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block7.Poster} title={block7.Title} _id={block7._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block8.Poster} title={block8.Title} _id={block8._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block9.Poster} title={block9.Title} _id={block9._id} class="multiview_element"/>
                    <MoviePoster poster_picture={block10.Poster} title={block10.Title} _id={block10._id} class="multiview_element"/>
                </div>
            </div>
        </div>
    );
}

const btn_row = {
    height: "3vh",
    width: "100%"
}

export default MultiView