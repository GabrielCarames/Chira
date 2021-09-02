const { Schema, model } = require('mongoose')

const User = new Schema({
    username:  String,
    phoneNumber: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = model("User", User);