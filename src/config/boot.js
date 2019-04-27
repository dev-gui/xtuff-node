'user strict'

module.exports = app => {
    //Faz o sync dos models no banco de dados
    app.src.config.db.sequelize.sync({ force: false }).done(() => {
        console.log(`\x1b[33m##################################\n`);
        console.log(`\x1b[33m INICIALIZAÇÃO API OK`);
        console.log(`\n\x1b[33m##################################`);
    });
}