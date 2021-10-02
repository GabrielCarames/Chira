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

router.post("/upload", async function(req, res, next) {
    const imageData = req.file
    const newImage = await chatController.createImage(imageData)
    res.send(newImage)
});

router.post("/profileimage", async function(req, res, next) {
    const imageData = req.file
    console.log("IMADTETADATA", imageData)
    const newImage = await chatController.createImage(imageData)
    res.send(newImage)
    // await userController.changeProfileImage(userLoggedId, newImage)
});

module.exports = router;