// to query using sequelize module. so you have to query model in here

const Sequelize = require('sequelize');
const sequelizeModels = {};

//  http://docs.sequelizejs.com/variable/index.html
// datatype document

sequelizeModels.User = {    
    sync: true,
    defaultPrimaryKey : true,
    sqzModelSet : {
        tableName: 'user',
        define: {
            email: { type: Sequelize.STRING(100), allowNull: false, },
            passwd:{ type: Sequelize.STRING(200), allowNull: false, }, 
            name: { type: Sequelize.STRING(20), allowNull: false, },
            createAt : { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') },
            updateAt : { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') } 
        },
        config: { timestamps: false } 
    },    
}

// for system
sequelizeModels.Common = {    
    sync: true,
    defaultPrimaryKey: false,
    sqzModelSet : {
        tableName: 'common',
        define: {
            groupCode: { type: Sequelize.STRING(50), allowNull: false },
            detailCode: { type: Sequelize.STRING(50), allowNull: false },
            codeName: { type: Sequelize.STRING(50), allowNull: false },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1),allowNull: false, defaultValue:'y' },
            description: {type: Sequelize.STRING(200), allowNull: false, },          
        },
        config: { timestamps: false }
    }    
}

// for service constant
sequelizeModels.Constant = {    
    sync: true,
    defaultPrimaryKey: false,
    sqzModelSet : {
        tableName: 'constant',
        define: {
            groupCode: { type: Sequelize.STRING(50), allowNull: false },
            detailCode: { type: Sequelize.STRING(50), allowNull: false },
            value1: { type: Sequelize.STRING(50), allowNull: false },
            value2: { type: Sequelize.STRING(50), allowNull: true },
            value3: { type: Sequelize.STRING(50), allowNull: true },
            value4: { type: Sequelize.STRING(50), allowNull: true },
            value5: { type: Sequelize.STRING(50), allowNull: true },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            description: { type: Sequelize.STRING(200), allowNull: false, },            
        },
        config: { timestamps: false }
    }
}

sequelizeModels.File = {    
    sync: true,
    defaultPrimaryKey: true,
    sqzModelSet : {
        tableName: 'file',
        define: {
            dirName: { type: Sequelize.STRING(50),allowNull : true },
            subDirName: { type: Sequelize.STRING(50), allowNull: false },
            viewFileName: { type: Sequelize.STRING(200), allowNull: false },
            phisicalFileName: { type: Sequelize.STRING(200), allowNull: false},
            useYn: { type: Sequelize.CHAR(1), allowNull : false, defaultValue : 'y'},
            createAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') },
            updateAt: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.fn('NOW') }
        },
        config: { timestamps: false }
    }    
}

module.exports = sequelizeModels;
