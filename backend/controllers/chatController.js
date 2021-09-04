const Chat = require('../models/Chat')
const Message = require('../models/Message')
const userController = {}

userController.saveMessages = async (user, message) => {
    console.log("dale loco soy oy", user, message)
    const newMessage = new Message (
        {
            message,
            user 
        }
    )
    await newMessage.save()
}

userController.createChat = async (user, friend, type) => {
    console.log("members", user, friend)
    const newChat = await new Chat(
        {
            type: type, 
            users: [
                user, friend
            ]
        }
    );
    await newChat.save()
    console.log("chat supuestamente ya creado")
}

module.exports = userController;