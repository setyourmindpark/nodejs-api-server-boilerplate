const modules ={};

modules.initialize = ({ assistant, formatter, pagenationMysql, senderMail, senderAndorid },
                      { queryHelperModules, sequelizeModules, jwtModules }) => {   

    modules.assistant = assistant;
    modules.formatter = formatter;
    modules.pagenationMysql = pagenationMysql;
    modules.senderMail = senderMail;
    modules.senderAndorid = senderAndorid;

    // modules.queryHelper = queryHelperModules.queryHelper1;
    modules.sequelize = sequelizeModules.syncdSequelize1;
    modules.jwtAccess = jwtModules.jwtAccess;
    modules.jwtRefresh = jwtModules.jwtRefresh;
}

module.exports = modules;
