const mysql = require('../mysql').pool;


exports.getListaSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT * FROM chamadas WHERE id_sala = ? ORDER BY data_hora ASC',
            [req.params.id_sala],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(call => {
                    return {
                        id_chamada: call.id_chamada,
                        medico: call.medico,
                        id_paciente: call.id_paciente,
                        id_sala: call.id_sala,
                        data_hora: call.data_hora,
                    }
                });
                return res.status(200).send(response)
            }


        )
    });
};
exports.getPacienteChamada = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT * FROM chamadas WHERE id_sala = ? AND id_paciente = ?',
            [req.params.id_sala, req.params.id_paciente],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(call => {
                    return {
                        id_chamada: call.id_chamada,
                        medico: call.medico,
                        id_paciente: call.id_paciente,
                        id_sala: call.id_sala,
                        data_hora: call.data_hora,
                    }
                });
                return res.status(200).send(response)
            }


        )
    });
};
exports.postChamada = (req, res, next) => {

    function uniqid(prefix = "", random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
    };

    const id = uniqid();


    const date = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });


    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            `INSERT INTO chamadas (id_chamada,medico,id_paciente,id_sala,data_hora)VALUES('` + id + `',?,?,?,NOW())`,
            [req.body.medico, req.body.id_paciente, req.body.id_sala],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Paciente na fila de Chamadas',
                    id_chamada: id,
                    medico: req.body.medico,
                    id_paciente: req.body.id_paciente,
                    id_sala: req.body.id_sala,
                    data_hora: req.body.data_hora
                };
                return res.status(200).send(response)
            }


        )
    });
};