'use strict'

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = null;
module.exports = (app) => {
    const sequelize = new Sequelize(
        'xtuff',
        'root',
        '12345678',
        {
            dialect: 'mysql',
            host: 'localhost',
            logging: false,
            port: '3306'
        }
    );
    sequelize.authenticate().then(() => {
        console.log('\n__________ Conectado ao Banco de Dados __________\n');
    });
    db = {
        sequelize,
        Sequelize,
        models: {}
    };
    // const dir = path.join(__dirname, "../models");
    // fs.readdirSync(dir).forEach(file => {
    //     const modelDir = path.join(dir, file);
    //     const model = sequelize.import(modelDir);
    //     db.models[model.name] = model;
    // });

    // for (let key of Object.keys(db.models)) {
    //     if (db.models[key].associate) {
    //         db.models[key].associate(db.models)
    //     }
    // }

    return db;
}