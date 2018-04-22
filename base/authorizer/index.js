exports.createModules = createModules;

const config = reqlib('/config');
const jwt = require('./jwt');
const type = config.context.auth;

function createModules(){
    let jwtAcess = undefined;
    let jwtRefresh = undefined;

    if (type === 'jwt') {
        const jwtAccessConfig = config.setting.auth.jwt.access;
        const jwtRefreshConfig = config.setting.auth.jwt.refresh;
        jwtAcess = jwt.createModule(jwtAccessConfig);
        jwtRefresh = jwt.createModule(jwtRefreshConfig);    
    }
    return {
        jwtAcess: jwtAcess,
        jwtRefresh: jwtRefresh,
        // ..
    }
}
