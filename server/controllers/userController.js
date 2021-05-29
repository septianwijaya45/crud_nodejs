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
                let removedUser = request.query.removed;
                response.render('home', {title: 'Data User', active: {User: true}, rows, removedUser});
            }else{
                console.log(error);
            }

        })
    });
}

//search data user
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

//create user
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

//edit user
exports.edit = (request, response) => {
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        // user call query
        connection.query('SELECT * FROM users WHERE id = ?', [request.params.id], (error, row) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                response.render('edit-user', {title: 'Data User', active: {User: true}, row});
            }else{
                console.log(error);
            }

        })
    });
}


//update user
exports.update = (request, response) => {
    const {first_name, last_name, email, phone, comment} = request.body;

    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        // user call query
        connection.query('UPDATE users SET first_name = ? , last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comment, request.params.id], (error, row) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                // user call query
                pool.getConnection((error, connection) => {
                    connection.query('SELECT * FROM users WHERE id = ?', [request.params.id], (error, row) => {
                        // when done with connection, release it!
                        connection.release();
    
                        if(!error){
                            response.render('edit-user', {title: 'Data User', active: {User: true}, row, alert: `${first_name} has been update!`});
                        }else{
                            console.log(error);
                        }
    
                    });
                });
            }else{
                console.log(error);
            }

        })
    });
}

//delete user
exports.delete = (request, response) => {
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        // user call query
        connection.query('DELETE FROM users WHERE id = ?', [request.params.id], (error, row) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                let removedUser = encodeURIComponent('User successfully removed');
                response.redirect('/user?removed='+ removedUser);
            }else{
                console.log(error);
            }

        })
    });
}

//detail user
exports.detail = (request, response) => {
    pool.getConnection((error, connection) => {
        if(error) throw error;
        console.log('Connected as ID ' + connection.threadId);

        // user call query
        connection.query('SELECT * FROM users WHERE id = ?', [request.params.id], (error, row) => {
            // when done with connection, release it!
            connection.release();

            if(!error){
                response.render('detail-user', {title: 'Detail Data User', active: {User: true}, row});
            }else{
                console.log(error);
            }

        })
    });
}