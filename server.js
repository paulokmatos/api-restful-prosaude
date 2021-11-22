const cors = require('cors');
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;

app.use(cors())

const server = http.createServer(app);

server.listen(port);