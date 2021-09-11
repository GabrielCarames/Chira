const Chat = require('../models/Chat')
const Message = require('../models/Message')
const User = require('../models/User')
const chatController = {}

chatController.saveMessages = async (user, message) => {
    const newMessage = new Message ({
        message,
        user
    })
    await newMessage.save()
    const completeMessage = chatController.findMessageById(newMessage._id)
    return completeMessage
}

chatController.createChat = async (user, contact, type) => {
    const newChat = await new Chat({
        type: type, 
        users: [user, contact]
    });
    await newChat.save()
}

chatController.findChatByContactId = async (userId, contactId) => {
    const chatFound = await Chat.find({"users": {$all: [userId, contactId]}}).populate({ //Se fija en el campo de users del chat a ver si existe un chat entre el usuario logueado y el amigo
        path: 'messages',
        model: 'Message',
            populate: {
                path: 'user',
                model: 'User'
            }
    }).populate({
        path: 'users',
        model: 'User'
    })
    return chatFound
}

chatController.findMessageById = async (messageId) => {
    const message = await Message.findOne({_id: messageId}).populate({
        path: 'user',
        model: 'User'
    })
    return message
}

chatController.findMessageByMessage = async (message) => {
    const messageFound = await Message.find({
        "message" : {'$regex' : '^' + message + '', '$options' : 'i'
    }}).populate({
        path: 'user',
        model: 'User'
    })
    return messageFound
}

chatController.findAllChats = async () => {
    const chat = await Chat.find().populate({ //Se fija en el campo de users del chat a ver si existe un chat entre el usuario logueado y el amigo
        path: 'messages',
        model: 'Message',
            populate: {
                path: 'user',
                model: 'User'
            }
    }).populate({
        path: 'users',
        model: 'User'
    })
    return chat
}

chatController.insertMessageInChat = async (fullMessage, currentlyChatId) => {
    await Chat.findOneAndUpdate({_id: currentlyChatId}, 
    {
        $push: {
            messages: fullMessage
        }
    })
}

module.exports = chatController;