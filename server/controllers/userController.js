





// Export View User
exports.view = (request, response) => {
    response.render('home', {title: 'Data User', active: {User: true}});
}