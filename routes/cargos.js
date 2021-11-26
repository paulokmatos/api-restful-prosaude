const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const cargoController = require('../controllers/cargos-controller');

router.get('/lista', login, cargoController.getLista);

router.get('/:id_usuario', login, cargoController.getCargoIdUsuario);

router.get('/agrupar/:id_cargo', login, cargoController.getGrupoCargos)

router.get('/tipo/lista', login, cargoController.getListaTipoCargo);

router.get('/tipo/:id_cargo', login, cargoController.getTipoIdCargo);

router.post('/cadastro', login, cargoController.postCargoUsuario);

router.post('/tipo/cadastro', login, cargoController.postTipoCargo);



module.exports = router;