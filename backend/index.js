// Estableces las dependencias
const express = require('express');
const app = express()

// Le decis a express que ponga como puerto del servidor bajo una condición
/* Si en el archivo .env existe una variable PORT (la cual no existe localmente, pero en deploy si),
    entonces la settea. Pero como no existe, coloca el puerto 3000
*/
app.set('port', process.env.PORT || 3001)

// Le decis a express para qe pueda entender archivos .JSON
app.use(express.json()) // No se si es totalmente necesario ahora mismo, pero una vez tuve problemas con JSON y lo meto siempre ahora

// Especificas las rutas que tenes
// app.use('/users', require('./routes/users'))
// && cd.. && cd frontend && npm start
// Le decis a express que obtenga el puerto de antes y arranque el sv
app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

// Requeris el archivo database.js, no hace fala que hagas la config de la bd en su archivo,
// pero queda mas ordenado
require('./database')

// Exportas express para que todos los puedan usar
module.exports = app