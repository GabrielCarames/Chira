const express = require('express');
const socket = require('socket.io')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path')

app.set('port', process.env.PORT || 3001)

app.use(cors());
app.use(express.json())
app.use(express.urlencoded());

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

app.use(multer({storage}).single('file'))

app.use('/users', require('./routes/users'))
app.use('/chat', require('./routes/chat'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public/uploads', express.static(__dirname + '/public/uploads/'));

const server = app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

io = socket(server);
require('./socket.js')(io)
require('./database')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
}

module.exports = app