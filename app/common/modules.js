const modules ={};
modules.initialize = ( queryHelperModule1, sequelizeModule1, jwtAccess, jwtRefresh ) => {
    modules.queryHelperModule = queryHelperModule1;
    modules.sequelizeModule = sequelizeModule1;
    modules.jwtAccessModule = jwtAccess;
    modules.jwtRefreshModule = jwtRefresh;    
}

module.exports = modules;
