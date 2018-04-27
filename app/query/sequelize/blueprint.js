// to query using sequelize module. so you have to query model in here

const Sequelize = require('sequelize');
const sqz = {};
sqz.models = {};
sqz.associations = {};

//  http://docs.sequelizejs.com/variable/index.html
// datatype document

sqz.models.User = {
    defaultPrimaryKey: true,       // false = { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
    modelSet : {
        tableName: 'user',
        define: {
            email: { type: Sequelize.STRING(100), allowNull: false, },
            passwd:{ type: Sequelize.STRING(200), allowNull: false, }, 
            name: { type: Sequelize.STRING(20), allowNull: false, },
            createdAt : { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt : { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') } 
        },
        config: {} 
    },    
}

sqz.models.Article = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'article',
        define: {
            userId: { type: Sequelize.INTEGER, allowNull: false },
            title: { type: Sequelize.STRING(50), allowNull: false },
            content: { type: Sequelize.STRING(50), allowNull: true },
            pid: { type: Sequelize.STRING(50), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

sqz.models.Book = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'book',
        define: {
            name: { type: Sequelize.STRING(50), allowNull: false },
            publish: { type: Sequelize.STRING(50), allowNull: true },            
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

sqz.models.UserBook = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'userBook',
        define: {
            userId: { type: Sequelize.INTEGER, primaryKey: true },
            bookId: { type: Sequelize.INTEGER, primaryKey: true },            
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

sqz.models.File = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'file',
        define: {
            dirName: { type: Sequelize.STRING(50), allowNull: true },
            subDirName: { type: Sequelize.STRING(50), allowNull: false },
            viewFileName: { type: Sequelize.STRING(200), allowNull: false },
            phisicalFileName: { type: Sequelize.STRING(200), allowNull: false },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

// for system
sqz.models.Common = {    
    defaultPrimaryKey: false,
    modelSet : {
        tableName: 'common',
        define: {
            groupCode: { type: Sequelize.STRING(50), allowNull: false },
            detailCode: { type: Sequelize.STRING(50), allowNull: false },
            codeName: { type: Sequelize.STRING(50), allowNull: false },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1),allowNull: false, defaultValue:'y' },
            description: {type: Sequelize.STRING(200), allowNull: false, },          
        },
        config: {}
    }    
}

// for service constant
sqz.models.Constant = {    
    defaultPrimaryKey: false,
    modelSet : {
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
        config: {}
    }
}


sqz.associations.User = {
    hasMany: [{
        model: 'Article',
        config: { foreignKey: 'userId', sourceKey: 'id' }
    }, {
        model: 'UserBook',
        config: { foreignKey: 'userId', sourceKey: 'id' }
    }]
}

sqz.associations.Article = {
    belongsTo: [{
        model: 'User',
        config: { foreignKey: 'userId', targetKey: 'id' }
    }],
}

sqz.associations.Article = {
    belongsTo: [{
        model: 'User',
        config: { foreignKey: 'userId', targetKey: 'id' }
    }],
}

sqz.associations.Book = {
    hasMany: [{
        model: 'UserBook',
        config: { foreignKey: 'bookId', sourceKey: 'id' }
    }]
}

sqz.associations.UserBook = {
    belongsTo: [{
        model: 'User',
        config: { foreignKey: 'userId', targetKey: 'id' }
    }, {
        model: 'Book',
        config: { foreignKey: 'bookId', targetKey: 'id' }
    }]
}

module.exports = sqz;

