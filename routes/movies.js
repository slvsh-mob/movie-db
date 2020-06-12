const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const multer = require('multer');

//Notes//
//This Document generates the methods available in the API with regard the 'movies' endpoint//
//Methods include GET(ALL) GET(movieID) GET(movieName) POST()// 

//Specify storage information for Multer Photo Upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
})

//Specify file filtering behaviour for Multer Photo Upload
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        //store a file
        callback(null, true)
    }
    else {
        //reject a file
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
//This is only implemented on the Delete & Update functionality currently
const checkAuth = require('../auth/check-auth')

//Movie model from Mongoose
const Movie = require('../models/movie.model');

//Basic GET Route --> Will Return all Movie Entries
router.get('/', (req, res, next) => {
    Movie.find()
    .select('_id Title Poster Year Runtime Rating Director Genre Synopsis')
    .exec()
    .then(docs => {
        if (docs.length >= 0){
            res.status(200).json(docs)
        }
            else{
                res.status(404).json({
                    message: "No entries found"
                })
            }
    })
})

//Search by Movie Name --> Will Return Movie by Movie Name (inclusive search)
  router.get('/title/:movie', (req, res, next) => {
    const movie_name = req.params.movie;
    Movie.find({ Title: new RegExp("^" + movie_name)}, (err, doc) => {
        if(err){
            console.log(err)
        }
    })
     .then(doc => {
        const count = Object.keys(doc).length
        if (count > 0){
            res.status(200).json(doc)
        }
        else{
            res.status(404).json({
                message: "No entries found"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }) 
})  

//Search by Movie Name --> Will Return Movie by Movie _id
router.get('/id/:movieId', (req, res, next) => {
    const movie_id = req.params.movieId;
    console.log("Movie ID  " + movie_id)
    Movie.findOne({ _id: movie_id })
    .then(doc => {
        //Get number of keys in response, 1 signifies error
        const count = Object.keys(doc).length
        if (count > 1){
            res.status(200).json(doc)
        }
        else{
            res.status(404).json({
                message: "No entries found"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//Create New Director Entry --> Will parse the form & director photo and upload to DB
router.post('/', upload.single("moviePoster"), (req, res, next) => {
    
    //Specify absolute path for file uploads
    const abs_path = 'http://localhost:5000/' + req.file.path

    const temp_movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Poster: abs_path,
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
            console.log(result)
            res.status(201).json({
                Message: "New Movie was Added",
                createdMovie: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})

//Handle Update Requests for Movies --> Update Movie file by Movie _id --> checkAuth Middleware
router.patch('/:movieId', checkAuth, (req, res, next) => {
    const movie_id = req.params.movieId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Movie.update({ _id: movie_id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

//Handle Delete requests for Movies --> Delete Movie entry by Movie _id --> checkAuth Middleware
router.delete('/:movieId', checkAuth, (req, res, next) => {
    const movie_id = req.params.movieId;
    Movie.remove({ _id: movie_id })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

module.exports = router;