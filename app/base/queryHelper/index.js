exports.execute = execute;
exports.transaction = transaction;
exports.executePI = executePI;
exports.executePR = executePR;

const conf = reqlib("/app/conf");
const mysql = require('./mysql');

let mainDbModile = undefined;
const type = conf.context.db;
if (type === 'mysql') {
  const mysqlConfig = conf.config.db.mysql;
  mainDbModile = mysql.createModule(mysqlConfig)
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
