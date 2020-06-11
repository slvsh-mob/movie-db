const mongoose = require("mongoose");

const DirectorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    Photo: {
        type: String,
        required: true
    },
    Birthdate: String,
    Hometown: {
        city: String,
        state: String
    },
    Description: String,
    date: {
        type: Date, 
        default: Date.now
    }
}, { collection: 'Directors'})

module.exports = mongoose.model("Director", DirectorSchema);