const Sequelize = require('sequelize');
//const assemble = require('../../assemble');

module.exports = {
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
