const { response, request } = require('express');
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
                response.render('home', {title: 'Search Data User', active: {User: true}, rows});
            }else{
                console.log(error);
            }
        })
    });
}


exports.form = (request, response) => {
    response.render('add-user.hbs', {title: 'Add Data User', active: {User: true}});
}

exports.create = (request, response) => {
    const {first_name, last_name, email, phone, comment} = request.body;
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = request.body.search;
        // user call query
        connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ? , phone = ?, comments = ?', [first_name, last_name, email, phone, comment], (error, rows) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                response.render('add-user', {title: 'Search Data User', active: {User: true}, alert: 'User Added Successfully'});
            }else{
                console.log(error);
            }
        })
    });
}