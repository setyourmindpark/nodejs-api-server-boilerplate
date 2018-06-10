const modules ={};

modules.initialize = ({ assistant, formatter, pagenationMysql, senderMail, senderAndorid },
                      { mongooseModules, sequelizeModules, jwtModules }) => {   

    modules.assistant = assistant;
    modules.formatter = formatter;
    modules.pagenationMysql = pagenationMysql;
    modules.senderMail = senderMail;
    modules.senderAndorid = senderAndorid;

    modules.mongoose = mongooseModules.mongoose1
    modules.sequelize = sequelizeModules.syncdSequelize1;
    modules.jwtAccess = jwtModules.jwtAccess;
    modules.jwtRefresh = jwtModules.jwtRefresh;
}

module.exports = modules;
