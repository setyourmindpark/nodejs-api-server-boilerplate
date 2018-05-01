const Sequelize = require('sequelize');

// 시스템에서 사용하는 공통 상수
module.exports = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'constant',
        define: {
            code: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true },
            name: { type: Sequelize.STRING(50), allowNull: false },
            group: { type: Sequelize.STRING(50), allowNull: false },            
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            description: { type: Sequelize.STRING(200), allowNull: false, },
        },
        config: {}
    }
}
