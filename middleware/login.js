const { response } = require('express');
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {

    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decode = await jwt.verify(token, "" + process.env.JWT_KEY);
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na Autenticação' });
    }
};