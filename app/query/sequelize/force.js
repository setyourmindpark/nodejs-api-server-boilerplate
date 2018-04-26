// NODEJS API SERVER BOLILERPLATE는 기본적으로 CLUSTER로 동작하기때문에 
// 테이블생성에대한 초기화는 이곳에서 수동으로 진행한다.
// 해당 프로젝트 EXPRESS 기동시 CLUSTER WORKERS 들의 시간차 생성으로 force : true 가 SYNC 맞지않아 에러가 난다.
// 즉, 테이블에 데이터가없는 상황이나, 기존데이터를 모두 지우고 강제로 테이블 재정의나 컬럼 재정의시 해당 로직을 수동으로 실행한다.  
// 해당 작업은 RIST가 존재하므로 반드시 root 계정으로 실행해야한다. 


const Sequelize = require('sequelize');
const isRoot = require('is-root');
const sequelizeModels = require('./models');
const rootPath = require('app-root-path');
require('dotenv').config({ path: rootPath.path + '/env/dev.env' });
const config = require('../../../config');
const { host, port, user, database, password } = config.setting.db.mysql;
const dialect = 'mysql';

(async () => {
    if (isRoot()) {
        const sequelize = new Sequelize(database, user, password, {
            host: host,
            dialect: dialect,
            logging: console.log,
            //logging: false,
            operatorsAliases: false,
            define: {
                freezeTableName: true,
            },
            timezone: '+09:00'      // set default now() timezone // default is south korea
        });
        const models = {};

        for (let model in sequelizeModels) {
            const { sync, defaultPrimaryKey, sqzModelSet } = sequelizeModels[model];
            const { tableName, define, config } = sqzModelSet;
            if (sync) {
                const defineModel = sequelize.define(
                    tableName,
                    define,
                    config
                );
                if (!defaultPrimaryKey) {
                    defineModel.removeAttribute('id');
                }
                models[model] = defineModel;
            }
        }

        await sequelize.sync({ force: true });          
        const resultEntity = await models.User.create({
            id : null,
            email: 'setyourmindpark@gmail.com',
            passwd : '0000',
            name : '박재훈'
        });
        console.log(resultEntity.get({ plain: true }))
        
        process.exit(1)

    } else {
        console.log('*****************WARNING*****************')
        console.log('YOU MUST EXECUTE THIS ROOT USER')
        console.log('*****************WARNING*****************')
    }
})();



