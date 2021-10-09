const chatController = require('./controllers/chatController');
const userController = require('./controllers/userController');

module.exports = (io) => {
  let currentlyChat
  let currentlyUsers = []

  const addUserLoggedToList = (userLoggedId, socketId) => {
    !currentlyUsers.some((user) => user.userLoggedId === userLoggedId) &&
    currentlyUsers.push({ userLoggedId, socketId });
  };
  
  const removeUserLoggedFromList = (socketId) => {
    currentlyUsers = currentlyUsers.filter((user) => user.socketId !== socketId);
  };
  
  const getUserLoggedFromList = (socketId) => {
    let user = currentlyUsers.filter((user) => user.socketId === socketId)
    return user
  };

  io.on('connection', (socket) => {
    socket.on('connected', async (userLogged) => {
      if(getUserLoggedFromList(socket.id).length === 0) {
        await userController.addSocketIdToUser(userLogged._id, socket.id)
        const updatedUserLogged = await userController.findUserById(userLogged._id)
        localStorage.setItem('userLogged', JSON.stringify(updatedUserLogged));
        socket.emit('userLogged', updatedUserLogged)
        addUserLoggedToList(updatedUserLogged[0]._id, socket.id);
      }
      io.emit("getUsersConnected", currentlyUsers);
    })

    socket.on("goToChat", async (userId, contactId) => {
      socket.broadcast.emit('disconnectingFromAllChats')
      currentlyChat = await chatController.findChatByContactId(userId, contactId)
      const updatedUser = await userController.findUserById(contactId)
      socket.emit("chatFound", currentlyChat);
      socket.to(updatedUser[0].socketId).emit('contactSeeingChat')
    });

    socket.on("goToGroupChat", async (groupName) => {
      socket.broadcast.emit('disconnectingFromAllChats')
      currentlyChat = await chatController.findGroupChatByGroupName(groupName)
      socket.emit("chatFound", currentlyChat);
    });

    socket.on("sendMessage", async (user, message) => {
      let fullMessage
      if(message.mimetype) fullMessage = await chatController.saveImageMessageAndReturnFullMessage(user, message)
      else fullMessage = await chatController.saveMessagesAndReturnFullMessage(user, message)
      console.log("mesasge", message)
      console.log("fullMessage", fullMessage)
      await chatController.insertMessageInChat(fullMessage, currentlyChat._id)
      io.emit("messageSent", fullMessage);
    });

    socket.on('typingPrivateChat', (contact, userLogged) => {
      socket.to(contact.socketId).emit('typingPrivateChat', userLogged)
    });

    socket.on('seenMessage', async (user, contactIdToAdviseSeenMessage) => {
      await chatController.updateSeenMessages()
      const updatedUser = await userController.findUserById(contactIdToAdviseSeenMessage)
      const contactChat = await chatController.findChatByContactId(user, contactIdToAdviseSeenMessage)
      io.to(updatedUser[0].socketId).emit('messageAlreadySeen', contactChat[0].messages)
    });

    socket.on('newMessageNotification', async (message, user, contact) => {
      const updatedUser = await userController.findUserById(contact[0]._id)
      const contactChat = await chatController.findChatByContactId(user._id, contact[0]._id)
      socket.to(updatedUser[0].socketId).emit('newNotification', message, contactChat)
    });

    socket.on('newImageProfile', async (userLoggedId, newImage) => {
      await userController.changeProfileImage(userLoggedId, newImage)
      const updatedUser = await userController.findUserById(userLoggedId)
      socket.emit('newImageProfileUpdated', updatedUser)
    });

    socket.on('newGroupImage', async (chatId, newImage) => {
       await chatController.changeGroupAvatarByChatId(chatId, newImage)
       const updatedChat = await chatController.findChatById(chatId)
      socket.emit('updatedGroupChat', updatedChat)
    });

    socket.on('disconnect', async () => {
      socket.broadcast.emit('disconnectingFromAllChats')
      await userController.removeSocketIdFromUserBySocketId(socket.id)
      removeUserLoggedFromList(socket.id)
      io.emit("getUsersConnected", currentlyUsers);
    })
  });
}