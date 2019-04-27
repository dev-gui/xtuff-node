'use strict'

const bodyParser = require('body-parser');
const debug = require('debug')('deb:deb');
const http = require('http');
var RateLimit = require('express-rate-limit');

var limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 10000, // limit each IP to 100 requests per windowMs 
    delayMs: 0, // disable delaying - full speed until the max limit is reached 
    message: { data: {}, message: 'Requested more 10000 per second, await a few minutes for new request.', erro: {} }
});

module.exports = (app) => {
    //Set only with proxy reverse
    app.enable('trust proxy');
    //Limit request per IP
    app.use(limiter);
    //Crio o servidor
    const port = normalizePort(process.env.PORT_API_CRM || '3000');
    //seta a porta
    app.set('port', port);
    //cria o server
    const server = http.createServer(app);
    //Start Server
    server.listen(port);
    //Start tratativa de erros do servidor
    server.on('error', onError);
    //Start Debug
    server.on('listening', onListening);
    //Console log porta
    console.log('Servidor inciado na porta: ' + port);
    //Verifico se a porta esta sendo utilizada
    function normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }

        return false;
    }

    //Tratamento dos erros do servidor
    function onError(error) {
        if (error.syscall != 'listen') {
            throw error;
        }
        const bind = typeof port === 'string' ?
            'Pipe ' + port :
            'Port ' + port;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' Necessário previlégios administrativos');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' Já está em uso');
                process.exit(1);
                break;
            default:
                throw error;

        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ?
            'Pipe ' + addr :
            'Port' + addr.port;
        debug('Listening on ' + bind);
    }

    //Limite para JSON File
    app.use(bodyParser.json({
        limit: '50mb'
    }));

    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Habilita o CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
}