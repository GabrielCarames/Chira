const { Schema, model } = require('mongoose')


const Image = new Schema({
    title: String,
    path: String,
    mimetype: String,
    size: Number,
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Image", Image)