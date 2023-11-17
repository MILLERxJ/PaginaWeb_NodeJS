import sql from 'mssql';
import { getConnection } from '../models/connection';
import config from '../config';

const stringConnection = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    options: {
        trustServerCertificate: true,
    },
};

const indexController = {};

indexController.index = (req, res) => {
    res.render('index')
}

indexController.login = (req, res) => {
    res.render('login')
}

indexController.inicioSesion = (req, res) => {
    res.render('inicioSesion')
}

indexController.registrar = (req, res) => {
    res.render('registrar')
}

indexController.reservar = (req, res) => {
    res.render('reservar')
}

indexController.crud = (req, res) => {
    res.render('crud')
}

indexController.contactos = (req, res) => {
    res.render('contactos')
}

indexController.listarReservas = async (req, res) => {
    try {
        const conex = await getConnection();
        const result = await conex.request().query('SELECT * FROM reservar');
        console.log(result.recordset);
        res.render('crud', { data: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

indexController.insertarReserva = async (req, res) => {
    try {
        const conex = await getConnection()
        const { cedula, numInvitados, fecha, hora, motivo } = req.body
        conex.request().query("insert into reservar(cedula, numInvitados, fecha, hora, motivo) values ('" + cedula + "','" + numInvitados + "','" + fecha + "', '" + hora + "', '" + motivo + "')")
        red.redirect('crud')
    } catch (error) {
        console.log(error)
    }
}

indexController.buscarReserva = async (req, res) => {
    try {
        const conex = await getConnection()
        const { txtBuscar } = req.body
        const result = await conex.request().query("select * from reservar where cedula = '" + txtBuscar + "'")
        res.render("crud", { data: result.recordset })

    } catch (error) {
        console.error(error)
    }
}

indexController.eliminarReserva = async (req, res) => {
    try {
        const conex = await getConnection()
        const { cedula } = req.params
        const result = await conex.request().query("delete from reservar where cedula = '" + cedula + "'")
        res.redirect("/crud")
    } catch (error) {
        console.error(error)
    }
}

indexController.editarReserva = async (req, res) => {
    try {
        const conex = await getConnection()
        const { cedula } = req.params
        const result = await conex.request().query("select * from reservar where cedula = '" + cedula + "'")
        res.render("editarReserva", {data : result.recordset[0]})
    } catch (error) {
        console.error(error)
    }
}

indexController.actualizarReserva = async (req, res) => {
    try{
        const conex =  await getConnection()
        const {cedula} = req.params
        const { numInvitados, fecha, hora, motivo} = req.body
        const query = `
        UPDATE reservar
        SET numInvitados = @numInvitados,
            fecha = @fecha,
            hora = @hora,
            motivo = @motivo
        WHERE cedula = @cedula
    `;

    await conex
        .request()
        .input('numInvitados', sql.Int, numInvitados)
        .input('fecha', sql.DateTime, new Date(fecha)) // Asegúrate de pasar la fecha correctamente
        .input('hora', sql.NVarChar, hora) // Asumo que hora es una cadena, ajusta según sea necesario
        .input('motivo', sql.NVarChar, motivo)
        .input('cedula', sql.NVarChar, cedula)
        .query(query);
        res.redirect("/crud")
    }catch(error){
        console.log(error)  
    }
}

indexController.insertarreservas = async (req, res) => {
    try {
        const conex = await sql.connect(stringConnection);
        const { cedula, numInvitados, fecha, hora, motivo } = req.body;

        const result = await conex.request()
            .input('cedula', sql.VarChar, cedula)
            .input('numInvitados', sql.Int, numInvitados)
            .input('fecha', sql.Date, fecha)
            .input('hora', sql.VarChar, hora)
            .input('motivo', sql.VarChar, motivo)
            .query(
                `INSERT INTO reservar (cedula, numInvitados, fecha, hora, motivo) 
                VALUES (@cedula, @numInvitados, @fecha, @hora, @motivo)`
            );
        await sql.close();
        if (result.rowsAffected.length > 0) {
            res.send('<script>alert("Inserción exitosa en la base de datos"); window.location="/reservar";</script>');
        } else {
            res.send('<script>alert("Error al insertar en la base de datos"); window.location="/reservar";</script>');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

export default indexController 