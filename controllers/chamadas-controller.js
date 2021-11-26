const mysql = require('../mysql').pool;


exports.getListaSala = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                'SELECT * FROM chamadas WHERE id_sala = ? AND atendido = false ORDER BY data_hora ASC',
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
                            data_hora: call.data_hora
                        }
                    });
                    return res.status(200).send(response)
                }


            )
        });
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};
exports.getPacienteChamada = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
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
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};
exports.postChamada = async (req, res, next) => {

    try {
        function uniqid(prefix = "", random = false) {
            const sec = Date.now() * 1000 + Math.random() * 1000;
            const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
            return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
        };

        const id = uniqid();





        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                `INSERT INTO chamadas (id_chamada,medico,id_paciente,id_sala,data_hora,chamar,atendido, max_chamadas)VALUES('` + id + `',?,?,?,NOW(),false,false,0)`,
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
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getExecutarChamada = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                'SELECT max_chamadas,id_chamada,(SELECT nome_sala FROM salas WHERE id_sala = chamadas.id_sala)sala,(SELECT nome_paciente FROM pacientes WHERE id_paciente = chamadas.id_paciente) paciente FROM chamadas as chamadas WHERE  chamar = true AND atendido = false AND max_chamadas < 3 ORDER BY data_hora ASC LIMIT 1',
                (error, result, field) => {
                    if (error) {
                        res.status(500).send({ error: error })
                    }

                    if (result.length > 0) {
                        const response = result.map(call => {
                            return {
                                id_chamada: call.id_chamada,
                                nome_paciente: call.paciente,
                                nome_sala: call.sala,
                                max_chamadas: call.max_chamadas
                            }
                        });


                        const idChamada = response[0].id_chamada;

                        const numeroChamada = response[0].max_chamadas;

                        conn.query(
                            `UPDATE chamadas SET max_chamadas = ` + numeroChamada + ` + 1 WHERE id_chamada = '` + idChamada + `'`,
                            (error, result, filed) => {
                                if (error) {
                                    res.status(500).send({ error: error })
                                }


                            }
                        );

                        return res.status(200).send(response)
                    } else {
                        return res.status(404).send({ mensagem: 'Nenhuma Chamada' })
                    }



                }


            )
        });
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.patchChamarPaciente = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }
            conn.query(
                `SELECT DATE_FORMAT(data_hora,'%Y-%m-%d %T')data_hora,id_chamada,id_paciente FROM (SELECT MIN(data_hora) AS data_hora,id_chamada as id_chamada, id_paciente as id_paciente FROM chamadas WHERE max_chamadas < 3 AND id_sala = ?) AS x`,
                [req.params.id_sala],
                (error, results, field) => {
                    const chamada = results.map(call => {
                        return {
                            data: call.data_hora,
                            id_chamada: call.id_chamada,
                            id_paciente: call.id_paciente
                        }
                    });

                    const dataChamada = chamada[0].data;




                    conn.query(
                        `UPDATE chamadas SET chamar= true, data_chamada = NOW() WHERE data_hora LIKE '%` + dataChamada + `%'`,
                        (error, result, field) => {
                            if (error) {
                                res.status(500).send({ error: error })
                            }
                            response = {
                                mensagem: 'Paciente irá ser Chamado',
                                id_chamada: chamada[0].id_chamada,
                                id_paciente: chamada[0].id_paciente
                            };

                            res.status(200).send(response)
                        }
                    )
                }
            )

        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};


exports.patchChamadaAtendida = async (req, res, next) => {
    try {
        await mysql.getConnection((error, conn) => {
            if (error) {
                res.status(500).send({ error: error })
            }

            conn.query(
                'UPDATE chamadas SET atendido = true WHERE id_chamada = ?',
                [req.params.id_chamada],
                (error, result, field) => {
                    if (error) {
                        res.status(500).send({ error: error })
                    }

                    const response = {
                        mensagem: 'Chamada Atendida'
                    };
                    return res.status(200).send(response)
                }


            )
        });
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};