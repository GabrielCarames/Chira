// Requeris mongoose y el dotenv
// dotenv sirve para que encuentre el archivo .env y se puedan usar sus variables
const mongoose= require('mongoose')
require('dotenv').config();

// Estableces la variable URI (Es un formato de mongo para decirle como te vas a conectar a el)
// Si existe "MONGODB_URI" en el .env, se pone, caso contrario usa el "MONGODB_URL"
// "MONGODB_URI" se crea en deploy
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : process.env.MONGODB_URL

// Le decis a mongoose que conecte en el URI de arriba y ponga esas configs
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// Haces la conexion
mongoose.connection.once('open', () => {
    console.log("Database Connected")
})