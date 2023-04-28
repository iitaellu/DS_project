const mongoose = require('mongoose');
const config = require('../config/database');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    username: String,
    password: String,
    patients: []
})

module.exports = mongoose.model("Doctor", doctorSchema)