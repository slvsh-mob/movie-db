const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: {
        type: String,
        required: true
    },
    Poster: String,
    Year: Number,
    Synopsis: String,
    Runtime: Number,
    Rating: String,
    Director: String,
    Genre: String,
    Ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
    }
],
    date: {
        type: Date, 
        default: Date.now
    }
}, { collection: 'Movies'})

module.exports = mongoose.model("Movie", MovieSchema);