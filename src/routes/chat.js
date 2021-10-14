const { Router } = require("express");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const router = Router();
const multer = require("multer");

const upload = multer();

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

router.post("/uploadimage", async function(req, res, next) {
    const imageData = req.file
    const newImage = await chatController.createImage(imageData)
    res.send(newImage)
});

router.post("/creategroup", async function(req, res, next) {
    const groupName = req.body.groupName
    const newImage = req.body.newImage
    console.log("groupimage", newImage)
    const groupContacts = req.body.groupContacts
    const newGroupChat = await chatController.createGroupChat(groupName, newImage, groupContacts)
    res.send(newGroupChat)
});

module.exports = router;