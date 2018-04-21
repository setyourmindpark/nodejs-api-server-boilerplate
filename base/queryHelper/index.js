exports.initialize = initialize;
exports.execute = execute;
exports.transaction = transaction;
exports.executePI = executePI;
exports.executePR = executePR;

const config = reqlib('/config');
const mysql = require('./mysql');
const type = config.context.db;
let mainDbModule = undefined;

// db가 여러개일경우 함수 추가하고 module명 새롭게 정의하여 createModule하면됨 .
async function initialize() {
    if (type === 'mysql') {
        try{            
            const mysqlConfig = config.setting.db.mysql;
            mainDbModule = mysql.createModule(mysqlConfig);
            await execute({ query: 'SELECT "ARE YOU ALIVE ?" FROM DUAL', expect: 'single' })
        }catch(err){
            throw err;
        }        
    }
}

function execute(...args) {
    return mainDbModule.execute(args[0], args[1], args[2], args[3], args[4]);
}

function transaction(...args) {
    return mainDbModule.transaction(args[0], args[1], args[2], args[3], args[4]);
}

function executePI(...args) {
    return mainDbModule.executePI(args[0], args[1], args[2], args[3], args[4]);
}

function executePR(...args) {
    return mainDbModule.executePR(args[0], args[1], args[2], args[3], args[4]);
}
