const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const salaController = require('../controllers/sala-controller');

router.get('/lista', login, salaController.getListaSala)
router.get('/:id_sala', login, salaController.getIdSala)
router.post('/cadastro', login, salaController.postSala)
router.patch('/editar', login, salaController.patchSala)

module.exports = router;