// const messageController = require('./controllers/messageController')
const chatController = require('./controllers/chatController')
// const userController = require('./controllers/userController');

// recibe la variable io

module.exports = (io) => {
  let user
  let currentlyChat
  io.on('connection', (socket) => {
    socket.on('connected', async (userLogged) => {
      user = userLogged
      console.log("Usuario conectado", user.username)
      socket.broadcast.emit('userConnected')
    })

    socket.on("mensaje", async (user, message) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      const { username } = user
      const fullMessage = await chatController.saveMessages(user, message) // ojo que aca se crea el mensaje pero devuelve el id del user y no el objeto arregla eso y anda todo
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      socket.emit("mensajes", { username, message });
    });

    socket.on("goToChat", async (userId, friendId) => {
      currentlyChat = await chatController.findChatByFriendId(userId, friendId)
      console.log("este es el chat requerido", currentlyChat)
      socket.emit("chatFound", currentlyChat);
    });
  
    // socket.on("disconnect", () => {
    //   // console.log("se fue al carajo", user.username)
    //   // io.emit("mensajes", {
    //   //   servidor: "Servidor",
    //   //   mensaje: `${user} ha abandonado la sala`,
    //   // });
    // });

    // // Recibe y envia que un usuario esta escribiendo
    // socket.on('typing', (data) => {
    //   socket.broadcast.emit('typing', data)
    // });

    socket.on('disconnect', () => {
      socket.broadcast.emit('userDisconnected')
      io.emit('userdisconnect', socket.name)
    })
  });
}