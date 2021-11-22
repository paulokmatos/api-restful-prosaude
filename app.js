const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');



//Rotas -- Pasta Routes
const rotaUsuario = require('./routes/usuario');
// const rotaSala = require('./routes/salas');




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }

    next();
})




//Rotas -- App.use
app.use('/usuario', rotaUsuario)
// app.use('/sala', rotaSala)



//Rota não encontrada
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        mensagem: error.message
    })
})





module.exports = app;