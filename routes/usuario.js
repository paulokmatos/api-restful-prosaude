const mysql = require('../mysql').pool;
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/lista', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM usuarios',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(user => {
                    return {
                        id_usuario: user.id_usuario,
                        nome_usuario: user.nome_usuario,
                        rg: user.rg,
                        cpf: user.cpf,
                        data_nascimento: user.data_nascimento,
                        idade: user.idade,
                        estado_civil: user.estado_civil,
                        endereco: user.endereco,
                        telefone: user.telefone,
                        login: user.login
                    }
                });

                return res.status(200).send(response)
            }
        )
    })
});

router.get('/:id_usuario', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [req.body.id_usuario],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(user => {
                    return {
                        id_usuario: user.id_usuario,
                        nome_usuario: user.nome_usuario,
                        rg: user.rg,
                        cpf: user.cpf,
                        data_nascimento: user.data_nascimento,
                        idade: user.idade,
                        estado_civil: user.estado_civil,
                        endereco: user.endereco,
                        telefone: user.telefone,
                        login: user.login
                    }
                });

                return res.status(200).send(response)
            }
        )
    })
});



router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }


        conn.query(
            'SELECT * FROM usuarios WHERE login = ?',
            [req.body.login],
            (error, result) => {
                if (error) {
                    res.status(500).send({ error: error })
                }
                if (result.length > 0) {
                    return res.status(409).send({ mensagem: 'Usuario Existente' })
                } else {
                    bcrypt.hash(req.body.senha, 10, (errorBcrypt, hash) => {
                        if (errorBcrypt) {
                            return res.status(500).send({ error: errorBcrypt })
                        }


                        conn.query(
                            'INSERT INTO usuarios(id_usuario,nome_usuario,rg,cpf,data_nascimento,idade,estado_civil,endereco,telefone,login,senha)VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                            [req.body.id_usuario,
                            req.body.nome_usuario,
                            req.body.rg,
                            req.body.cpf,
                            req.body.data_nascimento,
                            req.body.idade,
                            req.body.estado_civil,
                            req.body.endereco,
                            req.body.telefone,
                            req.body.login,
                                hash],

                            (error, result, field) => {
                                if (error) {
                                    res.status(500).send({ error: error })
                                }

                                const response = {
                                    mensagem: 'Usuario Cadastrado',
                                    id_usuario: req.body.id_usuario,
                                    nome_usuario: req.body.nome_usuario,
                                    rg: req.body.rg,
                                    cpf: req.body.cpf,
                                    data_nascimento: req.body.data_nascimento,
                                    idade: req.body.idade,
                                    estado_civil: req.body.estado_civil,
                                    endereco: req.body.endereco,
                                    telefone: req.body.telefone,
                                    login: req.body.login
                                };

                                return res.status(200).send(response)
                            }
                        )
                    })
                }
            }
        )




    })
});



router.post('/login', usuarioController.login)



module.exports = router;
