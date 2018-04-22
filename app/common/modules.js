const modules ={};

modules.initialize = ({ queryHelperModules, sequelizeModules, jwtModules }) => {   
    modules.queryHelperModule = queryHelperModules.queryHelperModule1;
    modules.sequelizeModule = sequelizeModules.sequelizeModule1;
    modules.jwtAccessModule = jwtModules.jwtAccess;
    modules.jwtRefreshModule = jwtModules.jwtRefresh;
}

module.exports = modules;
