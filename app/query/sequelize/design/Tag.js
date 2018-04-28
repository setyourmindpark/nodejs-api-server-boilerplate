const Sequelize = require('sequelize');
const sqzSet = {};

sqzSet.model = {
    Tag : {
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
}

sqzSet.association = {
    Tag : {
        hasMany: [{
            model: 'MemoTag',
            config: { foreignKey: 'tagId', sourceKey: 'id', constraints: false }
        }]
    }    
}

module.exports = sqzSet;