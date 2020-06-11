const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv/config')
//Handling Filepaths
const path = require('path')

//Import Routes and Components
const directorRoutes = require('./routes/directors');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movies');
const commentRoutes = require('./routes/comments')

//Intantiate Database Connectino
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => 
    console.log('connected to DB')
)

//For Deployment//Serve Static Assets from client/build//
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Set Upload folder and specify middleware
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//CORS Setup
app.use((req, res, next) => {
    //Allow Access Control Origin All
    res.header('Access-Control-Allow-Origin', '*');
    //Allow Access Control Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        //Allow PUT POST PATCH DELETE GET
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Define Routes (endpoints) for API
app.use('/directors', directorRoutes)
app.use('/user', userRoutes)
app.use('/movies', movieRoutes)
app.use('/comments', commentRoutes)

//Create General 404 Error
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

//Create Generat Status Error 500
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;