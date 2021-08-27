const { Router } = require("express");
const router = Router();

router.get('/', async function (req, res) {
    console.log("che hola")
    // res.render("hola")
})

router.post('/register', async function (req, res) {
    console.log("che feliz naviddad xd", req)
})

module.exports = router;