const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Import User Model (Mongoose)
const User = require('../models/user.model')

//Middleware for checking if JWT is present for user requests
//This is only implemented on the Delete functionality currently
const checkAuth = require('../auth/check-auth')

//Create New User --> Signup new user with this endpoint
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: "Email Already Registered"
                });
            } 
            else{
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        res.status(500).json({
                            error: error
                        })
                    }
                        else{
                            const user = new User({
                                _id: mongoose.Types.ObjectId(),
                                email: req.body.email,
                                username: req.body.username,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                password: hash
                            }); 
                            user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User Created'
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(500).json({
                                    error: error
                                })
                            })
                        }
                });
            }
        })
});


//Login Existing User -> Check existing user credentials and return JWT
//JWT will be used for making authorized requests to the API endpoints, this functionality is not implemented yet
router.post('/login', (req, res, next) => {
    console.log(req.body.email)
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Authorization Failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){
                return res.status(401).json({
                    message: "Authorization Failed"
                });
            }
            if (result) {
                console.log(user[0].email)
                console.log(user[0]._id)
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1hr"
                }
                );
                return res.status(200).json({
                    message: "Authorization Successful",
                    token: token,
                    userId: user[0]._id,
                    email: user[0].email,
                    username: user[0].username
                })
            }
            res.status(401).json({
                message: "Authorization Failed"
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})


//Delete Existing User --> Using user _id delete a user -- Requires Auth
router.delete('/:userId', checkAuth, (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(response => {
        res.status(200).json({
            message: "User Sucessfully Deleted",
            userId: req.params.userId
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    });
})

module.exports = router