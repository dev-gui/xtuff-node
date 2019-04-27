const app = require('express')()
const consign = require('consign')

consign({ verbose: false }, { cwd: 'src' })
    // .include('./src/config/config.js') //Incluo a config do projeto
    .include('./src/config/db.js') //A config do banco de dados
    .then('./src/config/boot.js') // Faz a inicialização do banco e tabelas
    .then('./src/services/') //Inclui os arquivos desta pasta
    .then("./src/config/middlewares.js") // Inicia o servidor
    .then('./src/repository/') // Inclui os repositorios
    .then('./src/controller/') // Inclui os controller
    .then('./src/routes/') // Cria as rotas
    .into(app); //Insere no escopo global do app

module.exports = app