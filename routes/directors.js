const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');

//Notes//
//This Document generates the methods available in the API with regard the 'directors' endpoint//
//Methods include GET(ALL) GET(name) GET(directorID) POST() PATCH() DELETE()//

//Specify storage information for Multer Photo Upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
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

//Director model from Mongoose
const Director = require('../models/director.model')

//Basic GET Route --> Will Return all Director Entries
router.get('/', (req, res, next) => {
    Director.find()
        .select('_id Name Birthdate Hometown Description')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                directors: docs
            })
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Search by Director _id --> Will Return Director by Director _id
router.get('/id/:directorId', (req, res, next) => {
    Director.findOne({ _id: req.params.directorId })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({ message: "No entries found" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Search by Director Name --> Will Return Director by Director Name
router.get('/:director', (req, res, next) => {
    Director.findOne({ Name: req.params.director })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({ message: "No entries found" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Create New Director Entry --> Will parse the form & director photo and upload to DB
router.post('/', checkAuth, upload.single("directorImage"), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: "A jpeg or png director image is required"
        })
    }

    const temp_director = new Director({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.name,
        Photo: '/uploads/' + req.file.filename,
        Birthdate: req.body.birthdate,
        Hometown: {
            city: req.body.hometown && req.body.hometown.city,
            state: req.body.hometown && req.body.hometown.state
        },
        Description: req.body.description
    })
    temp_director
        .save()
        .then(result => {
            res.status(201).json({
                Message: "New Director was Added",
                createdDirector: result
            })
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Handle Update Requests for Directors --> Update Director file by Director _id
router.patch('/:directorId', checkAuth, (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Director.updateOne({ _id: req.params.directorId }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

//Handle Delete requests for Directors --> Delete Director entry by Director _id
router.delete('/:directorId', checkAuth, (req, res, next) => {
    Director.deleteOne({ _id: req.params.directorId })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

module.exports = router;
