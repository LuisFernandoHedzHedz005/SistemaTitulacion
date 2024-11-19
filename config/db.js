const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'registroestudiante',
    multipleStatements: true, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const query = async (sql, params) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

module.exports = {
    query,
    pool 
};