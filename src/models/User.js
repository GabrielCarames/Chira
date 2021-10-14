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
    },
    avatar: {
        type: Object,
        default: 'https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png',
        required: false
    }
});

module.exports = model("User", User);