// const messageController = require('./controllers/messageController')
const chatController = require('./controllers/chatController')
// const userController = require('./controllers/userController');

// recibe la variable io

module.exports = (io) => {
  let user
  let currentlyChat
  io.on('connection', (socket) => {
    console.log("TOMACAPITO", socket.id)
    socket.on('connected', async (userLogged) => {
      user = userLogged
      console.log("Usuario conectado", user.username)
      // currentlyChatId = chatId
      // userRepeat = users.find(user => {
      //   return user == userLogged.name
      // })
      // if (!userRepeat) {
      //   users.push(userLogged.name)
      //   socket.name = userLogged.name
      //   socket.broadcast.emit('userconnect', currentlyChatId)
      // }
      // var messages = await chatController.getAllMessages(currentlyChatId);
      // socket.emit("chathistory", currentlyChatId, messages)
    })

    socket.on("mensaje", async (user, message) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      const { username } = user
      const fullMessage = await chatController.saveMessages(user, message) // ojo que aca se crea el mensaje pero devuelve el id del user y no el objeto arregla eso y anda todo
      console.log("ASDASDASDASASDASDAS", fullMessage)
      await chatController.insertMessageInChat(fullMessage, currentlyChat[0]._id)
      io.emit("mensajes", { username, message });
    });

    socket.on("goToChat", async (userId, friendId) => {
      currentlyChat = await chatController.findChatByFriendId(userId, friendId)
      console.log("chat", currentlyChat[0].messages)
      console.log("tomaproavor", currentlyChat)
      io.emit("chatFound", currentlyChat);
    });
  
    socket.on("disconnect", () => {
      // console.log("se fue al carajo", user.username)
      // io.emit("mensajes", {
      //   servidor: "Servidor",
      //   mensaje: `${user} ha abandonado la sala`,
      // });
    });

    // // Recibe y envia al cliente el mensaje del usuario
    // socket.on('message', async (data) => {
    //   const newMessage = await messageController.createAndSaveMessage(data)
    //   await chatController.addNewMessage(currentlyChatId, newMessage._id)
    //   io.emit('message', currentlyChatId, newMessage);
    //   //si el usuario mandó un mensaje, almacenarlo en una variable, entonces el proximo usuario que hable, se verifica que la id de la variable no sea igual a la del user del mensaje
    //   //si es igual, no mostrar su foto
    //   //si no es igual, significa que esta hablando el otro usuario, por lo que si se tiene que mostrar su foto.
    // });

    // // Recibe y envia que un usuario esta escribiendo
    // socket.on('typing', (data) => {
    //   socket.broadcast.emit('typing', data)
    // });

    // // Recibe y envia que un usuario se desconecto

    socket.on('disconnect', () => {
      io.emit('userdisconnect', socket.name)
    })
  });
}