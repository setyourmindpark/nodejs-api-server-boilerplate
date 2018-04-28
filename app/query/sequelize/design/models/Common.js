const Sequelize = require('sequelize');
const assemble = require('../../assemble');

assemble.models.Common = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'common',
        define: {
            groupCode: { type: Sequelize.STRING(50), allowNull: false },
            detailCode: { type: Sequelize.STRING(50), allowNull: false },
            codeName: { type: Sequelize.STRING(50), allowNull: false },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            description: { type: Sequelize.STRING(200), allowNull: false, },
        },
        config: {}
    }
}
