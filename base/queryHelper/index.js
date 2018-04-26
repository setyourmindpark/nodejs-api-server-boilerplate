exports.createModules = createModules;

const config = reqlib('/config');
const mysql = require('./mysql');
const baseType = config.base.db;

async function createModules(){
    let queryHelperModule1 = undefined;
    if (baseType === 'mysql') {
        const mysqlConfig = config.setting.db.mysql;
        queryHelperModule1 = mysql.createModule(mysqlConfig);
        await queryHelperModule1.execute({ query: 'SELECT "ARE YOU ALIVE ?" FROM DUAL', expect: 'single' })        
        
    }

    // const linkDb1 = config.setting.linkdb1;
    // ..
    
    return {
        queryHelperModule1: queryHelperModule1,
        // ..
    }
}
