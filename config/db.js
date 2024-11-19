const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'registroestudiante',
    multipleStatements: true, // Permitir múltiples sentencias en una consulta
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mantenemos la función query para compatibilidad con el código existente
const query = async (sql, params) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

/*
(async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM Estudiantes');
        console.log('Resultados:', rows);
        console.log('¿Es array?', Array.isArray(rows));
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
    }
})();

*/
module.exports = {
    query,
    pool  // Exportamos también el pool por si necesitas acceso directo
};