const { Schema, model } = require('mongoose')

const User = new Schema({
    username:  String,
    phoneNumber: String,
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    socketId: {
        type: String
    }
});

module.exports = model("User", User);