const express = require('express');
const socket = require('socket.io')
const app = express()
const cors = require('cors')

app.set('port', process.env.PORT || 3001)

app.use(cors());
app.use(express.json())
app.use(express.urlencoded());

app.use('/users', require('./routes/users'))
app.use('/chat', require('./routes/chat'))

const server = app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

io = socket(server);
require('./socket.js')(io)
require('./database')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'))
}

module.exports = app