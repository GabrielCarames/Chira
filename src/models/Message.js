const { Schema, model } = require('mongoose')


const Message = new Schema({
    message: {
        type: String,
        default: false
    },
    image: {
        type: Object,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seen: {
        type: Boolean, 
        default: false
   },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)