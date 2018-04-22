// to query using sequelize module. so you have to query model in here

const Sequelize = require('sequelize');
const sequelizeModel = {};

sequelizeModel.User = {
    tableName : 'user',
    sync : true,
    define :{
        name: Sequelize.STRING,    
    } 
}

module.exports = sequelizeModel;
