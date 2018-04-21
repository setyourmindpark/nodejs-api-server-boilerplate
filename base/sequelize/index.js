exports.initialize = initialize;
exports.getSequelize = getSequelize;

const Sequelize = require('sequelize');
const config = reqlib('/config');
const type = config.context.db;
let mainDbSequelize = undefined;

// db가 여러개일경우 함수 추가하고 module명 새롭게 정의하여 createModule하면됨 .
async function initialize(){
    try{
        if (type === 'mysql') {
            const mysqlConfig = Object.assign({ dialect : type } , config.setting.db.mysql);
            mainDbSequelize = createModule(mysqlConfig);
            await mainDbSequelize.query('SELECT "ARE YOU ALIVE ?" FROM DUAL', )
        }        
    }catch(err){
        throw err;
    }
}

function getSequelize(){
    return mainDbSequelize;
}

function createModule({ dialect, host, port, user, database, password, connectionLimit, logging }){
    try{
        const sequelize = new Sequelize(database, user, password, {
            host: host,
            dialect: dialect,
            pool: {
                max: connectionLimit,
                min: 0,                
            },            
            operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        });
        return sequelize;      
    }catch(err){
        throw err;
    }
}

