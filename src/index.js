import express from 'express'
import {engine} from 'express-handlebars'
import config from './config'
import path from 'path'
const app = express()
import router from './routes/index.router'
import indexController from './controllers/index.controller'
import bodyParser from 'body-parser'
//const loginRouters = require ('./index.router/login')


//MOTOR
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.engine('.hbs', engine({
    defaultLayout: 'plantilla',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.listen(config.port, () => {
    console.log("Escuchando")
})

app.use(router)


//INTENTO DE CARGAR CSS
app.use(router)
app.get('/', indexController.index)
app.use(express.static(path.join(__dirname, 'public')))