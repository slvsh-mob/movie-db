const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
}, { collection: 'Comments'});

module.exports = mongoose.model("Comment", CommentSchema);