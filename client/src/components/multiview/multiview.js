import React from 'react'
import MoviePoster from '../../moviepage/movieposter/movieposter';
import angry_men from '../posters/12_Angry_men.jpg'
import dark_knight from '../posters/The_Dark_Knight.jpg'
import godfather from '../posters/Godfather.jpg'
import godfather2 from '../posters/Godfather_II.jpg'
import shawshank from '../posters/Shawshank_Redemption.jpg'
import lor_ftr from '../posters/LOR_fellowship_of_the_ring.jpg'
import lor_rtk from '../posters/Lord_of_the_rings.jpg'
import tgtbth from '../posters/The_good_the_bad_and_the_ugly.jpg'
import sl from '../posters/Schindlers_List.jpg'
import pf from '../posters/Pulp_Fiction.jpg'

const MultiView = () => {
    return(
        <div className="multiview_style">
            <div className="multiview_top_buffer"></div>
            <div className="multiview_area">
                <div className="multiview_top_buffer"></div>
                <div className="multiview_row">
                    <MoviePoster poster_picture={shawshank} title="Shawshank Redemption"/>
                    <MoviePoster poster_picture={godfather} title="Godfather"/>
                    <MoviePoster poster_picture={godfather2} title="Godfather 2"/>
                    <MoviePoster poster_picture={dark_knight} title="12 Angry Men"/>
                    <MoviePoster poster_picture={angry_men} title="The Dark Knight"/>
                </div>
                <div className="multiview_top_buffer"></div>
                <div className="multiview_row">
                    <MoviePoster poster_picture={lor_rtk} title="Lord of the Rings, Return of the King"/>
                    <MoviePoster poster_picture={sl} title="Schindlers List"/>
                    <MoviePoster poster_picture={pf} title="Pulp Fiction"/>
                    <MoviePoster poster_picture={tgtbth} title="The good, the Bad and the Ugly"/>
                    <MoviePoster poster_picture={lor_ftr} title="Lord of the Rings, Fellowship of the Ring"/>
                </div>
            </div>
        </div>
    );
}

export default MultiView