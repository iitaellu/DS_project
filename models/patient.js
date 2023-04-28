const mongoose = require('mongoose');
const config = require('../config/database');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let patientSchema = new Schema({
    username: String,
    secretcode: String,
    doctors: [],
    medicines: []
})

module.exports = mongoose.model("Patient", patientSchema)