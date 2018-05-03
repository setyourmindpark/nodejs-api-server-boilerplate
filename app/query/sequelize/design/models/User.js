const Sequelize = require('sequelize');

module.exports = {
    defaultPrimaryKey: true,       // false = { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
    modelSet: {
        tableName: 'user',
        define: {
            email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
            passwd: { type: Sequelize.STRING(200), allowNull: false, },
            name: { type: Sequelize.STRING(20), allowNull: false, },
            typeCode: { type: Sequelize.STRING(20), allowNull: true, },
            provision: { type: Sequelize.TEXT, allowNull: true },
            token: { type: Sequelize.STRING(20), allowNull: true, },
            deviceCode: { type: Sequelize.STRING(20), allowNull: true, },                        
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}
