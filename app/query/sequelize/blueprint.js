// to query using sequelize module. so you have to query model in here

const Sequelize = require('sequelize');
const sqz = {};
sqz.models = {};
sqz.associations = {};

// http://docs.sequelizejs.com/variable/index.html
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

sqz.models.Memo = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'memo',
        define: {
            userId: { type: Sequelize.INTEGER, allowNull: false },
            title: { type: Sequelize.STRING(50), allowNull: false },
            content: { type: Sequelize.STRING(50), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

sqz.models.Tag = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'tag',
        define: {
            name: { type: Sequelize.STRING(50), allowNull: false },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}

sqz.models.MemoTag = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'memoTag',
        define: {
            memoId: { type: Sequelize.INTEGER, primaryKey: true },
            tagId: { type: Sequelize.INTEGER, primaryKey: true },            
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

// to define 
// User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
// Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
// Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
// Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
// MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
// MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

// set to define
sqz.associations.User = {
    hasMany: [{
        model: 'Memo',
        config: { foreignKey: 'userId', sourceKey: 'id', constraints: false }
    }]
}

sqz.associations.Memo = {
    hasMany: [{
        model: 'MemoTag',
        config: { foreignKey: 'memoId', sourceKey: 'id' ,constraints: false }
    }],
    belongsTo: [{
        model: 'User',
        config: { foreignKey: 'userId', targetKey: 'id', constraints: false }
    }],
}

sqz.associations.Tag = {
    hasMany: [{
        model: 'MemoTag',
        config: { foreignKey: 'tagId', sourceKey: 'id', constraints: false }
    }]
}

sqz.associations.MemoTag = {
    belongsTo: [{
        model: 'Memo',
        config: { foreignKey: 'memoId', targetKey: 'id', constraints: false }
    }, {
        model: 'Tag',
        config: { foreignKey: 'tagId', targetKey: 'id' , constraints: false }
    }]
}

module.exports = sqz;

