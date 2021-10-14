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
        default: "https://images.assetsdelivery.com/compings_v2/ylivdesign/ylivdesign1510/ylivdesign151000120.jpg",
        required: false
    }
});

module.exports = model("User", User);