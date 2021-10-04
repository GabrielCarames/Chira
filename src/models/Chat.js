const { Schema, model } = require('mongoose')

const Chat = new Schema({
    name: String,
    type: String,
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
    },
    avatar: {
        type: Object,
        required: false,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F9%2F9272.png&f=1&nofb=1',
    },
})

module.exports = model("Chat", Chat)