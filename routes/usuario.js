const mysql = require('../mysql').pool;
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

router.get('/lista', login, usuarioController.getListaUsuario);

router.get('/:id_usuario', login, usuarioController.getIdUsuario);

router.post('/cadastro', login, usuarioController.postUsuario);

router.post('/login', usuarioController.login)



module.exports = router;
