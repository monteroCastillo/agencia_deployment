import express from 'express';
import router from './routes/index.js';
import db from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config({path:'variables.env'})

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Define el puerto, el que asigne el servidor, sino lo hace por defecto usara el 4000
//const port = process.env.HOST || 4000;

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 4000;
//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) =>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
})
//Agregar bodyparser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir la carpeta Publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);



app.listen(port,host, () => {
    console.log(`el servidor esta funcionando en el ${port}`)
})