const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DATABASE_HOST,
    user            : process.env.DATABASE_USER,
    password        : process.env.DATABASE_PASSWORD,
    database        : process.env.DATABASE
});

pool.getConnection((error, connection) => {
    if(error){
        throw error;
    }

    console.log('Connected as ID ' + connection.threadId);
})
