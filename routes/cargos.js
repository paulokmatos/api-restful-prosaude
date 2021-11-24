const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');

router.get('/lista', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM cargos ',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(car => {
                    return {
                        id_cargo: car.id_cargo,
                        id_usuario: car.id_usuario

                    }
                });

                return res.status(200).send(response)

            }
        )
        conn.end();
    })

});


router.get('/:id_usuario', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM cargos WHERE id_usuario = ?',
            [req.params.id_usuario],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(car => {
                    return {
                        id_cargo: car.id_cargo,
                        id_usuario: car.id_usuario
                    }
                });
                return res.status(200).send(response)
            }
        )
        conn.end();
    })
});

router.get('/tipo/lista', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM cargos_tipo',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(car => {
                    return {
                        id_cargo: car.id_cargo,
                        nome_cargo: car.nome_cargo
                    }
                });
                return res.status(200).send(response)
            }
        )
        conn.end();
    })
});

router.get('/tipo/:id_cargo', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM cargos_tipo WHERE id_cargo = ?',
            [req.params.id_cargo],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(car => {
                    return {
                        id_cargo: car.id_cargo,
                        nome_cargo: car.nome_cargo
                    }
                });
                return res.status(200).send(response)
            }
        )
        conn.end();
    })
});

router.post('/cadastro', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO cargos(id_cargo,id_usuario)VALUES(?,?)',
            [req.body.id_cargo, req.body.id_usuario],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Cargo Relacionado ao Usuario',
                    id_cargo: req.body.id_cargo,
                    id_usuario: req.body.id_usuario
                };
                return res.status(200).send(response);
            }
        )
        conn.end();
    })
});

router.post('/tipo/cadastro', login, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO cargos_tipo(id_cargo,nome_cargo)VALUES(?,?)',
            [req.body.id_cargo, req.body.nome_cargo],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Cargo Cadastrado',
                    id_cargo: req.body.id_cargo,
                    nome_cargo: req.body.nome_cargo
                };
                return res.status(200).send(response);
            }
        )
        conn.end();
    })
});

module.exports = router;