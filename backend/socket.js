const chatController = require('./controllers/chatController')

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
  
  const getUserLoggedFromList = (userLoggedId) => {
    return currentlyUsers.find((user) => currentlyUsers.userLoggedId === userLoggedId);
  };

  io.on('connection', (socket) => {
    socket.on('connected', async (userLogged) => {
      addUserLoggedToList(userLogged._id, socket.id);
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

    socket.on('disconnect', () => {
      removeUserLoggedFromList(socket.id)
      io.emit("getUsersConnected", currentlyUsers);
    })
  });
}