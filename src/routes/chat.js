const { Router } = require("express");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const router = Router();

router.post('/allchatsfromuserlogged', async function (req, res) {
    const userLogged = req.body.userLogged
    const chats = await chatController.findAllChatsByUserId(userLogged._id)
    res.send(chats)
})

router.post('/searchmessages', async function (req, res) {
    const messageToFind = req.body.message
    const message = await chatController.findMessageByMessage(messageToFind)
    res.send(message)
})




module.exports = router;