const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;



router.get((req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM salas',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(sala => {
                    return {
                        id_sala: sala.id_sala,
                        nome_sala: sala.nome_sala
                    }
                });
                res.status(200).send(response)

            }
        )

    })
})
router.get((req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT * FROM WHERE id_sala = ?',
            [req.body.id_sala],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(sala => {
                    return {
                        id_sala: sala.id_sala,
                        nome_sala: sala.nome_sala
                    }
                });
            }
        )
    })
})
router.post((req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'INSERT INTO (id_sala,nome_sala)VALUES(?,?)',
            [req.body.id_sala, req.body.nome_sala],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    id_sala: req.body.id_sala,
                    nome_sala: req.body.nome_sala
                };

                res.status(200).send(response)
            }
        )
    })
})
router.patch((req, res, next) => {
    mysql.getConnection((req, res, next) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'UPDATE salas SET nome_sala = ? WHERE id_sala = ?',
            [req.body.nome_sala, req.body.id_sala],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    id_sala: req.body.id_sala,
                    nome_sala: req.body.nome_sala
                };

                res.status(200).send(response)
            }
        )
    })
})