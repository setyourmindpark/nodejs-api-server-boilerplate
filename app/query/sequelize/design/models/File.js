const Sequelize = require('sequelize');
const assemble = require('../../assemble');

assemble.models.File = {
    defaultPrimaryKey: true,
    modelSet: {
        tableName: 'file',
        define: {
            dirName: { type: Sequelize.STRING(50), allowNull: true },
            subDirName: { type: Sequelize.STRING(50), allowNull: false },
            viewFileName: { type: Sequelize.STRING(200), allowNull: false },
            phisicalFileName: { type: Sequelize.STRING(200), allowNull: false },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        },
        config: {}
    }
}
