exports.createModules = createModules;

const Sequelize = require('sequelize');
const baseTypes = config.base.db;
// const linkDb1 = config.setting.linkdb1;

async function createModules() {
    let sequelize1 = undefined;
    if (baseTypes.includes('mysql')) {
        const mysqlConfig = Object.assign({ dialect: 'mysql' }, config.setting.db.mysql);
        sequelize1 = createModule(mysqlConfig);
        await sequelize1.query('SELECT "ARE YOU ALIVE ?" FROM DUAL', )
    }

    // let sequelize2 = undefined;
    // ..

    return {
        sequelize1: sequelize1,
        // ..
    }
}

function createModule({ dialect, host, port, user, database, password, connectionLimit, connectionLeast }){
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: dialect,
        dialectOptions: {           // https://github.com/sequelize/sequelize/issues/854
            dateStrings: true,
            typeCast: true
        },
        pool: {
            max: connectionLimit,
            min: connectionLeast,
        },
        define: {            
            freezeTableName: true,
            timestamps: false
        },
        timezone: 'Asia/Seoul',     // set default now() timezone // default is seoul korea
        logging: false,
        operatorsAliases: false        
    });
    return sequelize;  
}
