exports.createModules = createModules;

const config = reqlib('/config');
const jwt = require('./jwt');
const type = config.context.auth;

function createModules(){
    let jwtAccess = undefined;
    let jwtRefresh = undefined;

    if (type === 'jwt') {
        const jwtAccessConfig = config.setting.auth.jwt.access;
        const jwtRefreshConfig = config.setting.auth.jwt.refresh;
        jwtAccess = jwt.createModule(jwtAccessConfig);
        jwtRefresh = jwt.createModule(jwtRefreshConfig);    
    }
    return {
        jwtAccess: jwtAccess,
        jwtRefresh: jwtRefresh,
        // ..
    }
}
