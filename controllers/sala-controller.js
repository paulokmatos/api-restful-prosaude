const mysql = require('../mysql').pool;


exports.getListaSala = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
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
                    return res.status(200).send(response)

                }
            )
            conn.end();

        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
};

exports.getIdSala = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                'SELECT * FROM salas WHERE id_sala = ?',
                [req.params.id_sala],
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
                    return res.status(200).send(response)
                }
            )
            conn.end();
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
};
exports.postSala = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                'INSERT INTO salas(id_sala,nome_sala,imagem)VALUES(?,?,?)',
                [req.body.id_sala, req.body.nome_sala, req.body.imagem],
                (error, result, field) => {
                    if (error) {
                        res.status(500).send({ error: error })
                    }

                    const response = {
                        id_sala: req.body.id_sala,
                        nome_sala: req.body.nome_sala,
                        imagem: req.body.imagem
                    };

                    return res.status(200).send(response)
                }
            )
            conn.end();
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
};
exports.patchSala = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
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

                    return res.status(200).send(response)
                }
            )
            conn.end()
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
};
