const mongoose = require('mongoose');
const config = require('../config/database');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let messageSchema = new Schema({
    patient: String,
    doctor: String,
    msg: [],
    read: Boolean
})

module.exports = mongoose.model("Message", messageSchema)