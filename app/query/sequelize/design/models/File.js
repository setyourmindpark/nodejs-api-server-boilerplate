const Sequelize = require('sequelize');

module.exports = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'file',
        define: {
            dirName: { type: Sequelize.STRING(50), allowNull: true },
            subDirName: { type: Sequelize.STRING(50), allowNull: false },
            viewFileName: { type: Sequelize.STRING(200), allowNull: false },
            phisicalFileName: { type: Sequelize.STRING(200), allowNull: false },
            url: { type: Sequelize.STRING(400), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}
