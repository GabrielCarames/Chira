const Chat = require('../models/Chat')
const Message = require('../models/Message')
const Image = require('../models/Image')
const chatController = {}

chatController.createNotification = async (user, contact, type) => {
    const newChat = await new Chat({
        type: type, 
        users: [user, contact]
    });
    await newChat.save()
}






// chatController.insertMessageInChat = async (fullMessage, currentlyChatId) => {
//     await Chat.findOneAndUpdate({_id: currentlyChatId}, 
//     {
//         $push: {
//             messages: fullMessage
//         }
//     })
// }





chatController.saveImageMessageAndReturnFullMessage = async (user, image) => {
    const newMessage = new Message ({
        image,
        user
    })
    await newMessage.save()
    const completeMessage = await chatController.findMessageById(newMessage._id)
    return completeMessage
}

chatController.saveMessagesAndReturnFullMessage = async (user, message) => {
    const newMessage = new Message ({
        message,
        user
    })
    await newMessage.save()
    const completeMessage = await chatController.findMessageById(newMessage._id)
    return completeMessage
}

chatController.createImage = async (imageData) => {
    const { originalname, path, mimetype, size } = imageData
    const newImage = new Image ({
        title: originalname,
        path,
        mimetype,
        size
    })
    await newImage.save()
    return newImage
}

chatController.createChat = async (user, contact, type) => {
    const newChat = await new Chat({
        type: type, 
        users: [user, contact]
    });
    await newChat.save()
}

chatController.createGroupChat = async (groupName, newImage, groupContacts) => {
    const newGroupChat = await new Chat({
        name: groupName,
        type: 'group',
        users: groupContacts,
        avatar: newImage
    });
    await newGroupChat.save()
    return newGroupChat
}

chatController.findAllChatById = async (chatId) => {
    const chat = await Chat.findOne({"_id": chatId}).populate({
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

chatController.findAllChatsByUserId = async (userId) => {
    const chat = await Chat.find({"users": userId}).populate({
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

chatController.findChatByContactId = async (userId, contactId) => {
    const chatFound = await Chat.findOne({"users": {$all: [userId, contactId]}}).populate({ //Se fija en el campo de users del chat a ver si existe un chat entre el usuario logueado y el amigo
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

chatController.findGroupChatByGroupName = async (groupName) => {
    const groupChatFound = await Chat.findOne({name: groupName}).populate({
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
    return groupChatFound
}

chatController.findMessageById = async (messageId) => {
    const message = await Message.findOne({_id: messageId}).populate({
        path: 'user',
        model: 'User'
    })
    return message
}

chatController.findMessageByUsername = async (username) => {
    const message = await Message.findOne({username: username}).populate({
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

chatController.findChatById = async (chatId) => {
    const chat = await Chat.findOne({_id: chatId}).populate({
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

chatController.changeGroupAvatarByChatId = async (chatId, newImage) => {
    const updatedChat = await Chat.findOneAndUpdate({_id: chatId}, 
    {
        avatar: newImage
    })
    console.log("daleforro", updatedChat)
    return updatedChat
}

chatController.updateSeenMessages = async (lastMessage) => {
    const lastMessageId = lastMessage._id
    await Message.updateMany({_id: lastMessageId ,"seen": false}, {"$set":{"seen": true}})
}

chatController.deleteChatById = async (chatId) => {
    await Chat.deleteOne({_id: chatId})
}

module.exports = chatController;