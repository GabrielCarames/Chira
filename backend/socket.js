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

    socket.on("mensaje", async (user, message) => {
      const { username } = user
      const fullMessage = await chatController.saveMessages(user, message)
      const seen = fullMessage.seen
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      io.emit("mensajes", { username, message, seen });
    });

    socket.on("goToChat", async (userId, contactId) => {
      currentlyChat = await chatController.findChatByContactId(userId, contactId)
      socket.emit("chatFound", currentlyChat);
    });

    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username)
    });

    socket.on('seenMessage', async (userToAdviseSeenMessage) => {
      console.log('viendomensajes', userToAdviseSeenMessage)
      await chatController.updateSeenMessages()
      socket.to(userToAdviseSeenMessage.socketId[0]).emit('messageAlreadySeen')
    });

    socket.on('newMessageNotification', async (message, receptorUser) => {
      const updatedUser = await userController.findUserById(receptorUser[0]._id)
      socket.to(updatedUser[0].socketId[0]).emit('newNotification', message, receptorUser)
    });

    // socket.on('update', async (userLogged, contact) => {
    //   userToUpdate = await userController.findUserById(userLogged._id)
    //   contactToUpdate = await userController.findUserById(contact._id)
    //   socket.to(contactToUpdate[0].socketId[0]).emit('latenesadentro')
    // })

    socket.on('disconnect', async () => {
      await userController.removeSocketIdFromUserBySocketId(socket.id)
      removeUserLoggedFromList(socket.id)
      io.emit("getUsersConnected", currentlyUsers);
    })
  });
}