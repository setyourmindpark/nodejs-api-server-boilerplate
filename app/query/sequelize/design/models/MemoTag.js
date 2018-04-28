const Sequelize = require('sequelize');

module.exports = {
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
}
