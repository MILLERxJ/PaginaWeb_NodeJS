import express from "express";
import indexController from "../controllers/index.controller";

const router = express.Router()


router.get('/', indexController.index)
router.get('/login', indexController.login)
router.get('/inicioSesion', indexController.inicioSesion)
router.get('/registrar', indexController.registrar)
router.get('/reservar', indexController.reservar)
router.post('/reservar', indexController.insertarreservas)
router.post('/buscarReserva', indexController.buscarReserva)
router.get('/crud', indexController.listarReservas)
router.post('/buscarReservitas', indexController.buscarReserva)
router.get('/eliminar/:cedula', indexController.eliminarReserva)
router.get('/editar/:cedula', indexController.editarReserva)
router.post('/actualizarReserva/:cedula', indexController.actualizarReserva)
router.get('/contactos', indexController.contactos)


export default router