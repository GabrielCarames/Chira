// const messageController = require('./controllers/messageController')
// const chatController = require('./controllers/chatController')
// const userController = require('./controllers/userController');

// recibe la variable io
module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('connected', async (userLogged, chatId) => {
      console.log("usuarir contartdaaaao")
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

    // socket.on('disconnect', () => {
    //   io.emit('userdisconnect', socket.name)
    // })
  });
}