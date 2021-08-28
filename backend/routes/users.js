const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.get('/', async function (req, res) {
    console.log("che hola")
    // res.render("hola")
})

router.post('/register', async function (req, res) {
    const userData = req.body
    const newUser = await userController.createUser(userData)
    console.log("nuevo usuario creado", newUser)
})

module.exports = router;