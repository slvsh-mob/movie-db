const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
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
const checkAuth = require('../auth/check-auth')

//Director model from Mongoose
const Director = require('../models/director.model')

//Basic GET Route --> Will Return all Movie Entries
router.get('/', (req, res, next) => {
    Director.find()
    .select('_id Name Birthdate Hometown Description')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            directors: docs
        }
        if (docs.length >= 0){
            res.status(200).json(response)
        }
            else{
                res.status(404).json({
                    message: "No entries found"
                })
            }
    })
})

//Search by Director Name --> Will Return Movie by Director Name
router.get('/:director', (req, res, next) => {
    const director = req.params.director;
    Director.findOne({Name: director})
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//Search by Director _id --> Will Return Director by Director _id
router.get('/:directorId', (req, res, next) => {
    const director_id = req.params.director;
    Director.findOne({_id: director_id})
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//Create New Director Entry --> Will parse the form & director photo and upload to DB
router.post('/', checkAuth, upload.single("directorImage"), (req, res, next) => {
    console.log(req.file)
    const temp_director = new Director({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.name,
        Photo: req.file.path,
        Birthdate: req.body.birthdate,
        Hometown: {
            city: req.body.hometown.city,
            state: req.body.hometown.state
        },
        Description: req.body.description
    })
    temp_director
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(error => console.log(error));
    res.status(201).json({
        Message: "Handling POST requests to /directors",
        createdDirector: temp_director
    });
})

//Handle Update Requests for Directors --> Update Director file by Director _id
router.patch('/:directorId', checkAuth, (req, res, next) => {
    const director_id = req.params.directorId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Director.update({ _id: director_id}, { $set: updateOps })
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

//Handle Delete requests for Directors --> Delete Director entry by Director _id
router.delete('/:directorId', checkAuth, (req, res, next) => {
    const director_id = req.params.directorId;
    Director.remove({ _id: director_id })
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