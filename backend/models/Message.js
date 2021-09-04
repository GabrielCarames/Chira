const { Schema, model } = require('mongoose')


const Message = new Schema({
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)