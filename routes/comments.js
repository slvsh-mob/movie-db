const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

//Notes//
//This Document generates the methods available in the API with regard the 'comments' endpoint//
//Methods include GET(ALL) GET(commentID) GET(userId) POST()// 

//Import Comment Model (Mongoose)
const Comment = require('../models/comment.model')

//Basic GET Route --> Will Return all Comment Entries
router.get('/', (req, res, next) => {
    Comment.find()
    .select('_id userID comment movieID date')
    .exec()
    .then(docs => {
        if (docs.length > 0){
            res.status(200).json(docs)
        }
        else{
            res.status(404).json({
                message: "No entries found"
            })
        }
    })
})

//GET Specific Comment --> Return Comment given commentID
router.get('/id/:commentId', (req, res, next) => {
    const comment_id = req.params.commentId
    Comment.findOne({ _id: comment_id})
    .select('_id userID comment movieID date')
    .exec()
    .then(docs => {
        if (docs.length > 0){
            res.status(200).json(docs)
        }
        else{
            res.status(404).json({
                message: "No entries found"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "An Error Occured",
            error: error
        })
    })
})

//GET All Comments for MovieId
router.get('/movie/:movieId', (req, res, next) => {
    const movie_id = req.params.movieId
    console.log(movie_id)
    Comment.find({ movieID: movie_id})
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                message: "An Error Occured",
                error: error
            })
        })
})

//Create New Comment
router.post('/', (req, res, next) => {
    const temp_comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userId,
        movieID: req.body.movieId,
        rating: req.body.rating,
        comment: req.body.comment,
    })

    temp_comment.save()
    .then(response => {
        res.status(201).json({
            message: "Comment created",
            comment: response
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "An Error Occured",
            error: error
        })
    })
})

module.exports = router