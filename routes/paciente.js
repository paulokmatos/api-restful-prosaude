
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente-controller');
const login = require('../middleware/login');

router.get('/busca-cpf/:cpf', login, pacienteController.getCpf);

router.get('/lista', login, pacienteController.getListaPaciente);

router.get('/:id_paciente', login, pacienteController.getIdPaciente);

router.post('/cadastro', login, pacienteController.postPaciente);





module.exports = router;
