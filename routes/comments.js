const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

//Notes//
//This Document generates the methods available in the API with regard the 'comments' endpoint//
//Methods include GET(ALL) GET(commentID) GET(movieID) POST()//

//Middleware for checking if JWT is present for user requests
const checkAuth = require('../auth/check-auth')

//Import Comment Model (Mongoose)
const Comment = require('../models/comment.model')

//Basic GET Route --> Will Return all Comment Entries
router.get('/', (req, res, next) => {
    Comment.find()
        .select('_id userID comment movieID rating date')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(error => {
            res.status(500).json({
                message: "An Error Occured",
                error: error.message
            })
        })
})

//GET Specific Comment --> Return Comment given commentID
router.get('/id/:commentId', (req, res, next) => {
    Comment.findOne({ _id: req.params.commentId })
        .select('_id userID comment movieID rating date')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "An Error Occured",
                error: error.message
            })
        })
})

//GET All Comments for MovieId --> username is populated for display
router.get('/movie/:movieId', (req, res, next) => {
    Comment.find({ movieID: req.params.movieId })
        .sort({ date: -1 })
        .populate('userID', 'username')
        .exec()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                message: "An Error Occured",
                error: error.message
            })
        })
})

//Create New Comment --> Requires Auth, the author is taken from the verified token
router.post('/', checkAuth, (req, res, next) => {
    const rating = Number(req.body.rating)
    if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
        return res.status(400).json({
            message: "Rating must be a number between 1 and 10"
        })
    }

    const temp_comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userID: req.userData.userId,
        movieID: req.body.movieId,
        rating: rating,
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
                error: error.message
            })
        })
})

module.exports = router
