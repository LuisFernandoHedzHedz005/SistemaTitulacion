const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: '123456',
  database: 'registroestudiante', 
});

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    query
};

//module.exports = pool;
