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
      const fullMessage = await chatController.saveMessages(user, message) // ojo que aca se crea el mensaje pero devuelve el id del user y no el objeto arregla eso y anda todo
      // console.log(currentlyChat)
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      // console.log("fukllmessage", fullMessage)
      const userLogged = JSON.parse(localStorage.getItem('userLogged'));
      console.log("userloged", userLogged[0].socketId[0])
      console.log("quecarajohacesaquipendejo")
      io.emit("mensajes", { username, message });
    });

    socket.on("goToChat", async (userId, contactId) => {
      currentlyChat = await chatController.findChatByContactId(userId, contactId)
      socket.emit("chatFound", currentlyChat);
    });

    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username)
    });

    socket.on('seenMessage', async () => {
      console.log('viendomensajes')
      await chatController.updateSeenMessages()
    });

    socket.on('newMessageNotification', async (message, receptorUser) => {
      console.log("receptoruser", receptorUser[0].socketId[0])
      socket.to(receptorUser[0].socketId[0]).emit('newNotification', message, receptorUser)
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