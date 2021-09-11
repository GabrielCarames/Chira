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
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      socket.emit("mensajes", { username, message });
    });

    socket.on("goToChat", async (userId, contactId) => {
      currentlyChat = await chatController.findChatByContactId(userId, contactId)
      socket.emit("chatFound", currentlyChat);
    });

    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username)
    });

    // socket.on('update', async (userLogged, contact) => {
    //   userToUpdate = await userController.findUserById(userLogged._id)
    //   contactToUpdate = await userController.findUserById(contact._id)
    //   socket.to(contactToUpdate[0].socketId[0]).emit('latenesadentro')
  // promesas son todo lo que nesitoce en la vida para progresar si, eso haré xD
  // A ver decime una frase en español que te la traduzco
  // Let's see, tell me one prhase in Spanish i will trastale it.
  // Ayer estaba en mi cama desnudo cuando el mueble se me vino abajo y me rompió toda la verga.
  // Yesterday i was in my bed naked when the forniture fell down and broke all my dick
    // })

    socket.on('disconnect', async () => {
      await userController.removeSocketIdFromUserBySocketId(socket.id)
      removeUserLoggedFromList(socket.id)
      io.emit("getUsersConnected", currentlyUsers);
    })
  });
}