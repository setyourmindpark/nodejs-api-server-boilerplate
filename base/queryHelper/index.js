exports.createModules = createModules;

const config = reqlib('/config');
const mysql = require('./mysql');
const baseType = config.base.db;
// const linkDb1 = config.setting.linkdb1;

async function createModules(){
    let queryHelper1 = undefined;
    if (baseType === 'mysql') {
        const mysqlConfig = config.setting.db.mysql;
        queryHelper1 = mysql.createModule(mysqlConfig);
        await queryHelper1.execute({ query: 'SELECT "ARE YOU ALIVE ?" FROM DUAL', expect: 'single' })  
        await queryHelper1.execute({ query: "insert into user values(null, 'setyourmindpark@gmail.com', '000022', '박재훈', now(), now())", expect: 'single' })  
        
    }

    // let queryHelper2 = undefined;
    // ..

    return {
        queryHelper1: queryHelper1,
        // ..
    }
}
