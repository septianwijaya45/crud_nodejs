const express = require('express');
const router = express.Router();
// import Controller
const userController = require('../controllers/userController');

// Router
// agak berbeda karena untuk CRUD dibuat spesific
router.get('/', userController.view);
router.post('/', userController.find);

// router.get('', (request, response) => {
//     response.render('home');
// }); //dihapus karena render template ditaruh di controller

module.exports = router;