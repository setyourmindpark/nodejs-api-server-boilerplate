const Sequelize = require('sequelize');
const sqzSet = {};

sqzSet.model = {
    Memo : {
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
};

sqzSet.association = {
    Memo : {
        hasMany: [{
            model: 'MemoTag',
            config: { foreignKey: 'memoId', sourceKey: 'id', constraints: false }
        }],
        belongsTo: [{
            model: 'User',
            config: { foreignKey: 'userId', targetKey: 'id', constraints: false }
        }],
    }
}

module.exports = sqzSet;