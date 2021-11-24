const mysql = require('../mysql').pool;

exports.getCidade = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cidades',
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhuma Cidade Encontrado'
                    });
                }

                const response = result.map(cid => {
                    return {
                        id_cidade: cid.id_cidade,
                        nome_cidade: cid.nome_cidade,
                        child: cid.child,
                        tipo: cid.tipo,
                        sigla: cid.sigla
                    }
                });
                return res.status(200).send(response)
            }
        );
    })
};
exports.getBairro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM bairros',
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum Bairro Encontrado'
                    });
                }

                const response = result.map(bai => {
                    return {
                        id_bairro: bai.id_bairro,
                        nome_bairro: bai.nome_bairro,
                        child: bai.child,
                        tipo: bai.tipo,
                        sigla: bai.sigla
                    }
                });
                return res.status(200).send(response)
            }
        );
    })
};
exports.getEstado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM estados',
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum Estado Encontrado'
                    });
                }

                const response = result.map(est => {
                    return {
                        id_estado: est.id_estado,
                        nome_estado: est.nome_estado,
                        child: est.child,
                        tipo: est.tipo,
                        sigla: est.sigla
                    }
                });
                return res.status(200).send(response)
            }
        );
    })
};
exports.getPais = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM paises',
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum País Encontrado'
                    });
                }

                const response = result.map(pais => {
                    return {
                        id_pais: pais.id_pais,
                        nome_pais: pais.nome_pais,
                        child: pais.child,
                        tipo: pais.tipo,
                        sigla: pais.sigla
                    }
                });
                return res.status(200).send(response)
            }
        );
    })
};
exports.postCidade = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO cidades(id_cidade,nome_cidade,child,tipo,sigla)VALUES(?,?,3,4,?)`,
            [req.body.nome_cidade, req.body.nome_cidade, req.body.sigla],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Cidade Cadastrada',

                    id_cidade: req.body.nome_cidade,
                    nome_cidade: req.body.nome_cidade,
                    child: 3,
                    tipo: 4,
                    sigla: req.body.sigla
                };
                return res.status(200).send(response);

            }
        )
    })
};
exports.postBairro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO bairros(id_bairro,nome_bairro,child,tipo,sigla)VALUES(?,?,4,5,?)`,
            [req.body.nome_bairro, req.body.nome_bairro, req.body.sigla],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Bairro Cadastrado',

                    id_bairro: req.body.nome_bairro,
                    nome_bairro: req.body.nome_bairro,
                    child: 4,
                    tipo: 5,
                    sigla: req.body.sigla
                };
                return res.status(200).send(response);

            }
        )
    })
};
exports.postEstado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO estados(id_estado,nome_estado,child,tipo,sigla)VALUES(?,?,2,3,?)`,
            [req.body.nome_estado, req.body.nome_estado, req.body.sigla],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Estado Cadastrado',

                    id_estado: req.body.nome_estado,
                    nome_estado: req.body.nome_estado,
                    child: 2,
                    tipo: 3,
                    sigla: req.body.sigla
                };
                return res.status(200).send(response);

            }
        )
    })
};
exports.postPais = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO paises(id_pais,nome_pais,child,tipo,sigla)VALUES(?,?,1,2,?)`,
            [req.body.nome_pais, req.body.nome_pais, req.body.sigla],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'País Cadastrado',

                    id_pais: req.body.nome_pais,
                    nome_pais: req.body.nome_pais,
                    child: 1,
                    tipo: 2,
                    sigla: req.body.sigla

                };
                return res.status(200).send(response);

            }
        )
    })
};

exports.getEndereco = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM endereco',
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum Endereco Encontrado'
                    });
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
        );
    })
};

exports.getEnderecoId = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM endereco WHERE id_endereco',
            [req.params.id_endereco],
            (error, result, field) => {
                if (error) { res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum Endereco Encontrado'
                    });
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
        );
    })
};

exports.postEndereco = (req, res, next) => {
    function uniqid(prefix = "", random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
    };

    const id = uniqid();


    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }

        conn.query(
            `INSERT INTO endereco (id_endereco,rua,numero,pais,estado,cidade,bairro,id_pessoa)VALUES('` + id + `',?,?,?,?,?,?,?)`,
            [req.body.rua,
            req.body.numero,
            req.body.pais,
            req.body.estado,
            req.body.cidade,
            req.body.bairro,
            req.body.id_pessoa],

            (error, result, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                }

                const response = {
                    id_endereco: id,
                    rua: req.body.rua,
                    numero: req.body.numero,
                    pais: req.body.pais,
                    estado: req.body.estado,
                    cidade: req.body.cidade,
                    bairro: req.body.bairro,
                    id_pessoa: req.body.id_pessoa
                };

                return res.status(200).send(response)
            }
        )
    })
};