exports.createModules = createModules;

const config = reqlib('/config');
const mysql = require('./mysql');
const type = config.context.db;

async function createModules(){
    let queryHelperModule1 = undefined;
    if (type === 'mysql') {
        const mysqlConfig = config.setting.db.mysql;
        queryHelperModule1 = mysql.createModule(mysqlConfig);
        await queryHelperModule1.execute({ query: 'SELECT "ARE YOU ALIVE ?" FROM DUAL', expect: 'single' })        
        
    }
    return {
        queryHelperModule1: queryHelperModule1,
        // ..
    }
}
