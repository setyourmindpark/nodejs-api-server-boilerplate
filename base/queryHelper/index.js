exports.initialize = initialize;
exports.execute = execute;
exports.transaction = transaction;
exports.executePI = executePI;
exports.executePR = executePR;

const config = reqlib('/config');
const mysql = require('./mysql');
const type = config.context.db;
let mainDbModile = undefined;

async function initialize() {
    if (type === 'mysql') {
        try{
            const mysqlConfig = config.setting.db.mysql;
            mainDbModile = mysql.createModule(mysqlConfig);
            await execute({ query: 'SELECT "ARE YOU ALIVE ?" FROM DUAL', expect: 'single' })
        }catch(err){
            throw err;
        }        
    }
}

function execute(...args) {
    return mainDbModile.execute(args[0], args[1], args[2], args[3], args[4]);
}

function transaction(...args) {
    return mainDbModile.transaction(args[0], args[1], args[2], args[3], args[4]);
}

function executePI(...args) {
    return mainDbModile.executePI(args[0], args[1], args[2], args[3], args[4]);
}

function executePR(...args) {
    return mainDbModile.executePR(args[0], args[1], args[2], args[3], args[4]);
}
