const mysql = require('../mysql').pool;
const express = require('express');
const router = express.Router();


router.get('/busca-cpf/:cpf', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM pacientes WHERE cpf = ?',
            [req.params.cpf],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(pac => {
                    return {
                        id_paciente: pac.id_paciente,
                        nome_paciente: pac.nome_paciente,
                        rg: pac.rg,
                        cpf: pac.cpf,
                        sexo: pac.sexo,
                        data_nascimento: pac.data_nascimento,
                        estado_civil: pac.estado_civil,
                        endereco: pac.endereco,
                        telefone: pac.telefone
                    }
                });

                return res.status(200).send(response)
            }
        )
    })
});

router.get('/lista', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM pacientes',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(pac => {
                    return {
                        id_paciente: pac.id_paciente,
                        nome_paciente: pac.nome_paciente,
                        rg: pac.rg,
                        cpf: pac.cpf,
                        sexo: pac.sexo,
                        data_nascimento: pac.data_nascimento,
                        estado_civil: pac.estado_civil,
                        endereco: pac.endereco,
                        telefone: pac.telefone
                    }
                });

                return res.status(200).send(response)
            }
        )
    })
});

router.get('/:id_paciente', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM pacientes WHERE id_paciente = ?',
            [req.params.id_paciente],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(pac => {
                    return {
                        id_paciente: pac.id_paciente,
                        nome_paciente: pac.nome_paciente,
                        rg: pac.rg,
                        cpf: pac.cpf,
                        sexo: pac.sexo,
                        data_nascimento: pac.data_nascimento,
                        estado_civil: pac.estado_civil,
                        endereco: pac.endereco,
                        telefone: pac.telefone
                    }
                });

                return res.status(200).send(response)
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
            'INSERT INTO pacientes(id_paciente,nome_paciente,rg,cpf,sexo,data_nascimento,estado_civil,endereco,telefone)VALUES(?,?,?,?,?,?,?,?,?)',
            [req.body.cpf,
            req.body.nome_paciente,
            req.body.rg,
            req.body.cpf,
            req.body.sexo,
            req.body.data_nascimento,
            req.body.estado_civil,
            req.body.endereco,
            req.body.telefone],

            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    mensagem: 'Paciente Cadastrado',
                    id_paciente: req.body.cpf,
                    nome_paciente: req.body.nome_paciente,
                    rg: req.body.rg,
                    cpf: req.body.cpf,
                    sexo: req.body.sexo,
                    data_nascimento: req.body.data_nascimento,
                    estado_civil: req.body.estado_civil,
                    endereco: req.body.endereco,
                    telefone: req.body.telefone
                };

                return res.status(200).send(response);
            }
        )




    })
});





module.exports = router;
