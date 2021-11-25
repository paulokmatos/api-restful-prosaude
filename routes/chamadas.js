const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const chamadasController = require('../controllers/chamadas-controller');


router.get('/lista/:id_sala', login, chamadasController.getListaSala);

router.get('/lista/:id_sala/:id_paciente', login, chamadasController.getPacienteChamada);

router.post('/adicionar', login, chamadasController.postChamada);

router.patch('/chamar-paciente/:id_sala', login, chamadasController.patchChamarPaciente)

router.patch('/paciente-atendido/:id_chamada', login, chamadasController.patchPacienteAtendido)



module.exports = router;