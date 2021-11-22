const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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