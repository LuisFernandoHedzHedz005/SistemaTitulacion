const pool = require('./db');
const { query } = require('./db');

async function registrarUsuario(cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad) {
    const sql = 'INSERT INTO Estudiantes (numero_cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad];

    await pool.query(sql, values);
}

async function verificarCuenta(cuenta) {
    try {
        const [rows] = await pool.query('SELECT numero_cuenta FROM Estudiantes WHERE numero_cuenta = ?', [cuenta]);
        console.log('Resultado de la consulta:', rows);
        
        if (rows && rows.numero_cuenta) {
            return true;
        }

        // Si rows es un array
        if (Array.isArray(rows) && rows.length > 0) {
            return true;
        }

        return false; 
    } catch (error) {
        console.error('Error en verificarCuenta:', error.message);
        throw error;
    }
}




async function registrarVisita(cuenta, fecha_visita, motivo) {
    await pool.query(
        'INSERT INTO Visitas (numero_cuenta, fecha_visita, motivo) VALUES (?, ?, ?)',
        [cuenta, fecha_visita, motivo]
    );
}

async function verificarAdmin(usuario) {
    console.log('Usuario recibido:', usuario); 
    const [rows] = await pool.query('SELECT * FROM Administradores WHERE usuario = ?', [usuario]);
    console.log('Resultado de verificarAdmin:', rows); 


    if (rows && rows.usuario) {
        return rows; 
    }
    return null; 
}


async function verificarContrasenaAdmin(usuario, contrasena) {
    const admin = await verificarAdmin(usuario);
    console.log('Administrador encontrado:', admin);
    if (admin) {
        if (contrasena === admin.contrasena) {
            console.log('Contraseña correcta');
            return true; 
        } else {
            console.log('Contraseña incorrecta');
        }
    } else {
        console.log('Usuario no encontrado');
    }
    return false; 
}


async function registrarVisitaAdmin(usuario, fecha_visita, motivo) {
    await pool.query(
        'INSERT INTO Visitas (usuario, fecha_visita, motivo) VALUES (?, ?, ?)',
        [usuario, fecha_visita, motivo]
    );
}


const getEstudiantes = async () => {
    try {
        const result = await query('SELECT * FROM Estudiantes');
        return result;
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        return [];
    }
};

const getAdministradores = async () => {
    try {
        const result = await query('SELECT * FROM Administradores');
        return result;
    } catch (error) {
        console.error('Error al obtener los administradores:', error);
        return [];
    }
};

const getVisitas = async () => {
    try {
        const results = await query('SELECT * FROM Visitas');
        return results;
    } catch (error) {
        console.error('Error al obtener las visitas:', error);
        return [];
    }
};


module.exports = {
    registrarUsuario,
    verificarCuenta,
    registrarVisita,
    verificarAdmin,
    verificarContrasenaAdmin,
    registrarVisitaAdmin,
    getEstudiantes,
    getAdministradores,
    getVisitas
};
