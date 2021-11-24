const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const enderecoController = require('../controllers/endereco-controller');
const login = require('../middleware/login');


router.get('/cidade/lista', login, enderecoController.getCidade);

router.get('/bairro/lista', login, enderecoController.getBairro);

router.get('/estado/lista', login, enderecoController.getEstado);

router.get('/pais/lista', login, enderecoController.getPais);

router.post('/cidade/cadastro', login, enderecoController.postCidade);

router.post('/bairro/cadastro', login, enderecoController.postBairro);

router.post('/estado/cadastro', login, enderecoController.postEstado);

router.post('/pais/cadastro', login, enderecoController.postPais);

router.get('/lista', login, enderecoController.getEndereco)

router.get('/:id_endereco', login, enderecoController.getEnderecoId)

router.post('/cadastro', login, enderecoController.postEndereco)

module.exports = router;
