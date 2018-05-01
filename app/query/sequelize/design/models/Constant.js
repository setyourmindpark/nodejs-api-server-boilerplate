const Sequelize = require('sequelize');

// 시스템에서 사용하는 공통 상수
module.exports = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'constant',
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
