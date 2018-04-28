const Sequelize = require('sequelize');
const sqzSet = {};

sqzSet.model = {
    MemoTag : {
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
};

sqzSet.association = {
    MemoTag : {
        belongsTo: [{
            model: 'Memo',
            config: { foreignKey: 'memoId', targetKey: 'id', constraints: false }
        }, {
            model: 'Tag',
            config: { foreignKey: 'tagId', targetKey: 'id', constraints: false }
        }]
    }    
}

module.exports = sqzSet;