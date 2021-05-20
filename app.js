const express       = require('express');
const exphbs        = require('express-handlebars');
const bodyParser    = require('body-parser');
const path          = require('path');
const db            = require('./db_config');

// deklarasikan dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse appication/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }))

// Parser application/json
app.use(bodyParser.json());

// deklarasikan static folder untuk template css, scss, js, etc file
app.use(express.static('public'));

// Templating Engine
app.engine(
    'hbs', 
    exphbs({ 
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: path.join(__dirname, '/views/layouts/partials'),
    })
);
app.set('view engine', 'hbs');

// router
app.get('', (request, response) => {
    response.render('home', {title: 'Data User', active: {Home: true}});
});

app.listen(port, () => {
    console.log(`Server is running with port ${port}`);
})