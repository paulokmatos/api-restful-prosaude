const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;



router.get('/lista', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT FROM endereco',
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = result.map(end => {
                    return {
                        id_endereco: end.id_endereco,
                        rua: end.rua,
                        numero: end.numero,
                        pais: end.pais,
                        estado: end.estado,
                        cidade: end.cidade,
                        bairro: end.bairro,
                        id_pessoa: end.id_pessoa
                    }
                });

                return res.status(200).send(response)
            }
        )
    })

})


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO endereco (id_endereco,rua,numero,pais,estado,cidade,bairro,id_pessoa)VALUES(?,?,?,?,?,?,?,?)',
            [req.body.id_endereco, req.body.rua, req.body.numero, req.body.pais, req.body.estado, req.body.cidade, req.body.bairro, req.body.id_pessoa],
            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    id_endereco: end.id_endereco,
                    rua: end.rua,
                    numero: end.numero,
                    pais: end.pais,
                    estado: end.estado,
                    cidade: end.cidade,
                    bairro: end.bairro,
                    id_pessoa: end.id_pessoa
                };

                return res.status(200).send(response)
            }
        )
    })
})