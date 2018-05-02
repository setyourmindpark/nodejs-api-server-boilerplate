const Sequelize = require('sequelize');

module.exports = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'file',
        define: {
            type: { type: Sequelize.STRING(20), allowNull: true },
            provision: { type: Sequelize.TEXT, allowNull: true },
            location: { type: Sequelize.STRING(400), allowNull: true },
            dirName: { type: Sequelize.STRING(50), allowNull: true },
            subDirName: { type: Sequelize.STRING(50), allowNull: true },
            viewFileName: { type: Sequelize.STRING(200), allowNull: true },
            phisicalFileName: { type: Sequelize.STRING(200), allowNull: true },            
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}
