const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.post('/register', async function (req, res) {
    const userData = req.body
    const existingUser = await userController.findExistingUser(userData)
    // const registeredUser = await userController.findUserByPhoneNumber(userData)
    if(existingUser) {
        console.log("Usuario encontrado, logueando", existingUser, typeof existingUser)
        localStorage.setItem('userLogged', JSON.stringify(existingUser));
        res.send(existingUser)
        // res.status(401).send("Ya existe un usuario con ese número de teléfono")
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
    const friendId = req.body.friend._id
    const stringUser = localStorage.getItem('userLogged')
    const objectUser = JSON.parse(stringUser)
    const userId = objectUser._id
    await userController.addNewFriend(userId, friendId)
    res.sendStatus(201)
})

module.exports = router;