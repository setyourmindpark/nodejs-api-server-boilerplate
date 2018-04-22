exports.createModules = createModules;

const Sequelize = require('sequelize');
const config = reqlib('/config');
const type = config.context.db;

async function createModules() {
    let sequelizeModule1 = undefined;
    if (type === 'mysql') {
        const mysqlConfig = Object.assign({ dialect: type }, config.setting.db.mysql);
        sequelizeModule1 = createModule(mysqlConfig);
        await sequelizeModule1.query('SELECT "ARE YOU ALIVE ?" FROM DUAL', )
        
    }
    return {
        sequelizeModule1: sequelizeModule1,
        // ..
    }
}

function createModule({ dialect, host, port, user, database, password, connectionLimit, logging }){
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
}
