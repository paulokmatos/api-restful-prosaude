const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const enderecoController = require('../controllers/endereco-controller');



router.get('/cidade/lista', enderecoController.getCidade);

router.get('/bairro/lista', enderecoController.getBairro);

router.get('/estado/lista', enderecoController.getEstado);

router.get('/pais/lista', enderecoController.getPais);

router.post('/cidade/cadastro', enderecoController.postCidade);

router.post('/bairro/cadastro', enderecoController.postBairro);

router.post('/estado/cadastro', enderecoController.postEstado);

router.post('/pais/cadastro', enderecoController.postPais);

router.get('/lista', enderecoController.getEndereco)

router.get('/:id_endereco', enderecoController.getEnderecoId)

router.post('/cadastro', enderecoController.postEndereco)

module.exports = router;
