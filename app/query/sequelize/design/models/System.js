const Sequelize = require('sequelize');

// 시스템에서 사용하는 공통 상수
module.exports = {
    defaultPrimaryKey: false,
    modelSet: {
        tableName: 'system',
        define: {
            code: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true },
            group: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true },            
            value1: { type: Sequelize.STRING(50), allowNull: false },            
            value2: { type: Sequelize.STRING(50), allowNull: true },
            value3: { type: Sequelize.STRING(50), allowNull: true },
            displayOrder: { type: Sequelize.INTEGER(3), allowNull: true },
            useYn: { type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'y' },
            description: { type: Sequelize.STRING(200), allowNull: true, },
        },
        config: {}
    }
}
