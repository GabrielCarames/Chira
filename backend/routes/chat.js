const { Router } = require("express");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const router = Router();

router.get('/allchats', async function (req, res) {
    const chats = await chatController.findAllChats()
    res.send(chats)
})





module.exports = router;