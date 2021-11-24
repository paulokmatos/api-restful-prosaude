const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getListaUsuario = (req, res, next) => {
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
};
exports.getIdUsuario = (req, res, next) => {
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
};
exports.postUsuario = (req, res, next) => {
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
};


exports.login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM usuarios WHERE login = ?',
            [req.body.login],
            (error, results, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (results.length < 1) {
                    return res.status(401).send({ mensagem: 'Falha na Autenticação' })
                }

                bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                    if (err) {
                        return res.status(401).send({ mensagem: 'Falha na Autenticação' })
                    }
                    if (result) {
                        const token = jwt.sign({
                            id_usuario: results[0].id_usuario,
                            login: results[0].login
                        },
                            "" + process.env.JWT_KEY,
                            {
                                expiresIn: "24h"
                            });

                        return res.status(200).send({
                            mensagem: 'Autenticado com Sucesso',
                            token: token
                        });
                    }
                    return res.status(401).send({ mensagem: 'Falha na Autenticação' })
                });

            });
    });
};