const pool = require('./db');

async function registrarUsuario(nombre, apellido_paterno, apellido_materno, fecha_registro, semestre, edad) {
    const sql = 'INSERT INTO Estudiantes (nombre, apellido_paterno, apellido_materno, fecha_registro, semestre, edad) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido_paterno, apellido_materno, fecha_registro, semestre, edad];

    await pool.query(sql, values);
}

module.exports = {
    registrarUsuario
};
