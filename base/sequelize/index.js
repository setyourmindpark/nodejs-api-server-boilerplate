exports.createModules = createModules;

const Sequelize = require('sequelize');
const config = reqlib('/config');
const baseType = config.base.db;
// const linkDb1 = config.setting.linkdb1;

async function createModules() {
    let sequelizeModule1 = undefined;
    if (baseType === 'mysql') {
        const mysqlConfig = Object.assign({ dialect: baseType }, config.setting.db.mysql);
        sequelizeModule1 = createModule(mysqlConfig);
        await sequelizeModule1.query('SELECT "ARE YOU ALIVE ?" FROM DUAL', )
    }

    // let sequelizeModule2 = undefined;
    // ..

    return {
        sequelizeModule1: sequelizeModule1,
        // ..
    }
}

function createModule({ dialect, host, port, user, database, password, connectionLimit, connectionLeast }){
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: dialect,
        pool: {
            max: connectionLimit,
            min: connectionLeast,
        },
        define: {            
            freezeTableName: true,
        },
        timezone: '+09:00',     // set default now() timezone // default is south korea
        logging: false,
        operatorsAliases: false        
    });
    return sequelize;  
}
