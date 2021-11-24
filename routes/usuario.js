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
                        nome_usuario: user.nome_usuario,
                        rg: user.rg,
                        cpf: user.cpf,
                        sexo: user.sexo,
                        data_nascimento: user.data_nascimento,
                        estado_civil: user.estado_civil,
                        endereco: user.endereco,
                        telefone: user.telefone,
                        login: user.login
                    }
                });

                return res.status(200).send(response)
            }
        )

        conn.end();
    })
});

router.get('/:id_usuario', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [req.params.id_usuario],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(user => {
                    return {
                        nome_usuario: user.nome_usuario,
                        rg: user.rg,
                        cpf: user.cpf,
                        sexo: user.sexo,
                        data_nascimento: user.data_nascimento,
                        estado_civil: user.estado_civil,
                        endereco: user.endereco,
                        telefone: user.telefone,
                        login: user.login
                    }
                });

                return res.status(200).send(response)
            }
        )

        conn.end();
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
                            'INSERT INTO usuarios(id_usuario,nome_usuario,rg,cpf,sexo,data_nascimento,estado_civil,endereco,telefone,login,senha)VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                            [req.body.cpf,
                            req.body.nome_usuario,
                            req.body.rg,
                            req.body.cpf,
                            req.body.sexo,
                            req.body.data_nascimento,
                            req.body.estado_civil,
                            req.body.endereco,
                            req.body.telefone,
                            req.body.cpf,
                                hash],

                            (error, result, field) => {
                                if (error) {
                                    res.status(500).send({ error: error })
                                }

                                const response = {
                                    mensagem: 'Usuario Cadastrado',
                                    nome_usuario: req.body.nome_usuario,
                                    rg: req.body.rg,
                                    cpf: req.body.cpf,
                                    sexo: req.body.sexo,
                                    data_nascimento: req.body.data_nascimento,
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


        conn.end();




    })
});



router.post('/login', usuarioController.login)



module.exports = router;
