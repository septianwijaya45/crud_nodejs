const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// pool.getConnection((error, connection) => {
//     if(error){
//         throw error;
//     }

//     console.log('Connected as ID ' + connection.threadId);
// })

module.exports = {pool};