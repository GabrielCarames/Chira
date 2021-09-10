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
      console.log(getUserLoggedFromList(socket.id))
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
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      socket.emit("mensajes", { username, message });
    });

    socket.on("goToChat", async (userId, friendId) => {
      currentlyChat = await chatController.findChatByFriendId(userId, friendId)
      socket.emit("chatFound", currentlyChat);
    });

    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username)
    });

    // socket.on('update', async (userLogged, friend) => {
    //   userToUpdate = await userController.findUserById(userLogged._id)
    //   friendToUpdate = await userController.findUserById(friend._id)
    //   socket.to(friendToUpdate[0].socketId[0]).emit('latenesadentro')
    // })

    socket.on('disconnect', async () => {
      await userController.removeSocketIdFromUserBySocketId(socket.id)
      removeUserLoggedFromList(socket.id)
      io.emit("getUsersConnected", currentlyUsers);
    })
  });
}