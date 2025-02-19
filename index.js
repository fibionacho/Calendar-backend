const express = require("express");
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const path = require('path');

//Crear servidor de express

const app = express();

//BBDD
dbConnection();

//Cors
app.use(cors());
//Directorio publico
app.use(express.static('public'));


//Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto 4000");
});