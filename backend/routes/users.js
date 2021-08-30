const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.get('/', async function (req, res) {
    console.log("che hola")
    // res.render("hola")
})

router.post('/register', async function (req, res) {
    const userData = req.body
    const registeredUser = await userController.findUserByPhoneNumber(userData)
    if(registeredUser) {
        res.status(401).send("Ya existe un usuario con ese número de teléfono")
    } else {
        const newUser = await userController.createUser(userData)
        console.log("nuevo usuario creado", newUser)
        res.send(newUser)
    }
})

module.exports = router;