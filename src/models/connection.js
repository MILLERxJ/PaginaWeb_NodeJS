import sql from 'mssql'
import config from '../config'

const stringconnection = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    options: {
        trustServerCertificate: true
    }
}

export async function getConnection() {
    try {
        const conex = await sql.connect(stringconnection)
        return conex
    } catch (error) {
        console.error(error)
    }
}

export default getConnection