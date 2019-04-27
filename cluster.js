const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();

if (cluster.isMaster) {

    cpus.forEach(function() {
        cluster.fork();
        console.log('here')
    });

    cluster.on("listening", worker => {
        console.log("cluster %d Conectado", worker.process.pid);
    });

    cluster.on("disconnect", worker => {
        console.log("cluster %d Desconectado", worker.process.pid);
    });

    cluster.on("exit", function(worker) {
        console.log("cluster %d perdido", worker.process.pid);
        cluster.fork();
    });


} else {
    require('./index');
}