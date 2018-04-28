const Sequelize = require('sequelize');

module.exports = {
    defaultPrimaryKey: false,
    modelSet: {
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
