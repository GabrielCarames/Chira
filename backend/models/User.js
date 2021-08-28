const { Schema, model } = require('mongoose')

const User = new Schema({
    username:  String,
    phoneNumber: String
});

module.exports = model("User", User);