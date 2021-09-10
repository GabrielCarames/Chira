const { Router } = require("express");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const router = Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.post('/register', async function (req, res) {
    const userData = req.body
    const existingUser = await userController.findExistingUser(userData)
    if(existingUser) {
        // localStorage.setItem('userLogged', JSON.stringify(existingUser));
        console.log("me encontro")
        res.send(existingUser)
    } else {
        const newUser = await userController.createUser(userData)
        res.send(newUser)
    }
})

router.post('/friendsearch', async function (req, res) {
    const userName = req.body.term
    const requestUser = await userController.findUsersByName(userName)
    res.send(requestUser)
})

router.post('/addfriend', async function (req, res) {
    const friend = req.body.friend
    const friendId = friend._id
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const userId = user[0]._id
    console.log("cosa a", userId, "cosa b", friendId)
    await userController.addNewFriend(userId, friendId)
    const updatedUserLogged = await updateUserLogged(userId)
    await chatController.createChat(user[0], friend, 'private')
    res.send(updatedUserLogged)
})

const updateUserLogged = async (userId) => {
    const updatedUser = JSON.stringify(await userController.findUserById(userId))
    localStorage.setItem('userLogged', updatedUser)
    const updatedUserLogged = JSON.parse(localStorage.getItem('userLogged'))
    return updatedUserLogged
}

router.post('/updateuser', async function (req, res) {
    const userLogged = req.body.userLogged
    const requestUser = await userController.findUsersByName(userLogged.username)
    console.log("este es el usuarioi a updatear", requestUser)
    // res.send(requestUser)
})

module.exports = router;