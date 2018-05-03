const Sequelize = require('sequelize');

module.exports = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'common',
        define: {
            code: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true },
            group: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true }, 
            value1: { type: Sequelize.STRING(50), allowNull: false },
            value2: { type: Sequelize.STRING(50), allowNull: true },
            value3: { type: Sequelize.STRING(50), allowNull: true },
            value4: { type: Sequelize.STRING(50), allowNull: true },
            value5: { type: Sequelize.STRING(50), allowNull: true },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            description: { type: Sequelize.STRING(200), allowNull: true, },
        },
        config: {}
    }
}
