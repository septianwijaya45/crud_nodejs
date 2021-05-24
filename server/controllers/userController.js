const { pool } = require('../../db_config')





// Export View User
exports.view = (request, response) => {
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        // user call query
        connection.query('SELECT * FROM users where status = "active"', (error, rows) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                response.render('home', {title: 'Data User', active: {User: true}, rows});
            }else{
                console.log(error);
            }

        })
    });
}

exports.find = (request, response) => {
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = request.body.search;
        // user call query
        connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%'+searchTerm+'%', '%'+searchTerm+'%'], (error, rows) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                response.render('home', {title: 'Data User', active: {User: true}, rows});
            }else{
                console.log(error);
            }
        })
    });
}