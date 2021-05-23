const { request, response } = require("express");



exports.view = (request, response) => {
    response.render('homepage', {title: 'User Manajemen App', active: {Home: true}});
}