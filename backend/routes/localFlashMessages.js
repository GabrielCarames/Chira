const { Router } = require('express')
const router = Router()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/', function (req, res) {
  const successLocalFlashMessage = localStorage.getItem("successMessage")
  const failureLocalFlashMessage = localStorage.getItem("failureMessage")
  successLocalFlashMessage ? res.send(successLocalFlashMessage) : res.send(failureLocalFlashMessage)
})

router.put('/removeflashmessage', function (req, res) {
  localStorage.removeItem('successMessage');
  localStorage.removeItem('failureMessage');
})

module.exports = router

