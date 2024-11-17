const pool = require('./db');

async function registrarUsuario(cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad) {
    const sql = 'INSERT INTO Estudiantes (numero_cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad];

    await pool.query(sql, values);
}

async function verificarCuenta(cuenta) {
    try {
        const [rows] = await pool.query('SELECT numero_cuenta FROM Estudiantes WHERE numero_cuenta = ?', [cuenta]);
        console.log('Resultado de la consulta:', rows);
        
        // Validar si rows es un objeto y no un array
        if (rows && rows.numero_cuenta) {
            return true; // El número de cuenta está registrado
        }

        // Si rows es un array
        if (Array.isArray(rows) && rows.length > 0) {
            return true;
        }

        return false; // El número de cuenta no está registrado
    } catch (error) {
        console.error('Error en verificarCuenta:', error.message);
        throw error;
    }
}



// Registrar la visita
async function registrarVisita(cuenta, fecha_visita, motivo) {
    await pool.query(
        'INSERT INTO Visitas (numero_cuenta, fecha_visita, motivo) VALUES (?, ?, ?)',
        [cuenta, fecha_visita, motivo]
    );
}

module.exports = {
    registrarUsuario,
    verificarCuenta,
    registrarVisita
};
