const express = require('express');
const router = express.Router();
// import Controller
const userController = require('../controllers/userController');
const { route } = require('./home');

// Router
// agak berbeda karena untuk CRUD dibuat spesific
router.get('/', userController.view);
router.post('/', userController.find);

router.get('/add-user', userController.form);
router.post('/add-user', userController.create);

router.get('/edit-user/:id', userController.edit);
router.post('/edit-user/:id', userController.update);

router.get('/:id', userController.delete);

router.get('/detail-user/:id', userController.detail);

// router.get('', (request, response) => {
//     response.render('home');
// }); //dihapus karena render template ditaruh di controller

module.exports = router;