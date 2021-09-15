const mongoose= require('mongoose')
require('dotenv').config();

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : process.env.MONGODB_URL

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', () => {
    console.log("Database Connected")
})