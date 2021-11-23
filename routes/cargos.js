const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/lista', (req, res, next) => {
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

                res.status(200).send(response)

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
            'SELECT * FROM cargos WHERE id_usuario = ?',
            [req.body.id_usuario],
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
            }
        )
    })
});

router.get('/tipo/lista', (req, res, next) => {
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
            }
        )
    })
});

router.get('/tipo/:id_cargo', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM cargos_tipo WHERE id_cargo = ?',
            [req.body.id_cargo],
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
            'INSERT INTO cargos(id_cargo,id_usuario)VALUES(?,?)',
            [req.body.id_cargo, req.body.id_usuario],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Cargo Adicionado ao Usuario',
                    id_cargo: car.id_cargo,
                    id_usuario: car.id_usuario
                };
            }
        )
    })
});

router.post('/tipo/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO cargos_tipo()VALUES()',
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
            }
        )
    })
});