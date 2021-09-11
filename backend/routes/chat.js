const { Router } = require("express");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const router = Router();

router.get('/allchats', async function (req, res) {
    const chats = await chatController.findAllChats()
    res.send(chats)
})

router.post('/searchmessages', async function (req, res) {
    const messageToFind = req.body.message
    console.log("messageaencontrar", messageToFind)
    const message = await chatController.findMessageByMessage(messageToFind)
    console.log("message encontrados", message)
    res.send(message)
})




module.exports = router;