const mysql = require('../mysql').pool;


exports.getListaSala = (req, res, next) => {
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
                return res.status(200).send(response)

            }
        )

    })
};

exports.getIdSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
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
    })
};
exports.postSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
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
    })
};
exports.patchSala = (req, res, next) => {
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

                return res.status(200).send(response)
            }
        )
    })
};
