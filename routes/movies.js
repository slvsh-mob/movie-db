const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require('multer');

//Notes//
//This Document generates the methods available in the API with regard the 'movies' endpoint//
//Methods include GET(ALL) GET(movieID) GET(movieName) POST() PATCH() DELETE()//

//Specify storage information for Multer Photo Upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        //Sanitize the original name and prefix a timestamp (colons from
        //toISOString() broke URLs and Windows filesystems)
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        callback(null, Date.now() + '-' + safeName);
    }
})

//Specify file filtering behaviour for Multer Photo Upload
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    }
    else {
        callback(null, false)
    }
}

//Create Instance of Multer for file upload: 10MB file limit
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

//Middleware for checking if JWT is present for user requests
const checkAuth = require('../auth/check-auth')

//Movie model from Mongoose
const Movie = require('../models/movie.model');

//Basic GET Route --> Will Return all Movie Entries
router.get('/', (req, res, next) => {
    Movie.find()
        .select('_id Title Poster Year Runtime Rating Director Genre Synopsis')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Search by Movie Name --> Will Return Movie(s) by Movie Name (inclusive, case-insensitive search)
router.get('/title/:movie', (req, res, next) => {
    //Escape regex special characters in the search term
    const movie_name = req.params.movie.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    Movie.find({ Title: new RegExp("^" + movie_name, "i") })
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                res.status(200).json(docs)
            }
            else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Search by Movie _id --> Will Return Movie by Movie _id
router.get('/id/:movieId', (req, res, next) => {
    Movie.findOne({ _id: req.params.movieId })
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
            res.status(500).json({ error: error.message })
        })
})

//Create New Movie Entry --> Will parse the form & movie poster and upload to DB --> checkAuth Middleware
router.post('/', checkAuth, upload.single("moviePoster"), (req, res, next) => {
    //Multer rejects non jpeg/png files, in which case req.file is undefined
    if (!req.file) {
        return res.status(400).json({
            message: "A jpeg or png poster image is required"
        })
    }

    //Store a relative path so posters resolve in any environment
    const poster_path = '/uploads/' + req.file.filename

    const temp_movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Poster: poster_path,
        Year: req.body.year,
        Synopsis: req.body.synopsis,
        Runtime: req.body.runtime,
        Rating: req.body.rating,
        Director: req.body.director,
        Genre: req.body.genre
    })
    temp_movie
        .save()
        .then(result => {
            res.status(201).json({
                Message: "New Movie was Added",
                createdMovie: result
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Handle Update Requests for Movies --> Update Movie file by Movie _id --> checkAuth Middleware
router.patch('/:movieId', checkAuth, (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Movie.updateOne({ _id: req.params.movieId }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Handle Delete requests for Movies --> Delete Movie entry by Movie _id --> checkAuth Middleware
router.delete('/:movieId', checkAuth, (req, res, next) => {
    Movie.deleteOne({ _id: req.params.movieId })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

module.exports = router;
