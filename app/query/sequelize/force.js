// NODEJS API SERVER BOLILERPLATE는 기본적으로 CLUSTER로 동작하기때문에 
// 테이블생성에대한 초기화는 이곳에서 수동으로 진행한다.
// 해당 프로젝트 EXPRESS 기동시 CLUSTER WORKERS 들의 시간차 생성으로 force : true 가 SYNC 맞지않아 에러가 난다.
// 즉, 테이블에 데이터가없는 상황이나, 기존데이터를 모두 지우고 강제로 테이블 재정의나 컬럼 재정의시 해당 로직을 수동으로 실행한다.  
// 해당 작업은 RISK가 존재하므로 반드시 root 계정으로 실행해야한다. 
const prompt = require('prompt');
const Sequelize = require('sequelize');
const isRoot = require('is-root');
const sqzSync = require('./sync');
const rootPath = require('app-root-path');
const system = require('../../common/constant/system')
require('dotenv').config({ path: rootPath.path + '/env/dev.env' });
const config = require('../../../config');
const { host, port, user, database, password } = config.setting.db.mysql;
const dialect = 'mysql';

if(!isRoot()){
    console.log('###################### 해당작업은 root 권한으로만 실행가능합니다. ######################')
    return;
} 

console.log('###################### [ 경고 ] 반드시 DDL 생성과 초기화 작업이 필요한경우에만 수행해주세요 ######################')
prompt.start();
console.log('######################  sequelize를 사용하여 테이블을 생성및 초기화를 진행하시겠습니까 ?  yes or no ###################### ')
prompt.get([{
    name: 'yesorno',
    required: true
}],  (err, result) => {
    if(err) return;
    if (result.yesorno !== 'yes') return;
    
    (async () => {
        try{
            const sequelize = new Sequelize(database, user, password, {
                host: host,
                dialect: dialect,
                logging: console.log,
                operatorsAliases: false,
                define: {
                    timestamps: false,
                    freezeTableName: true,
                },
                dialectOptions: {           // https://github.com/sequelize/sequelize/issues/854
                    dateStrings: true,
                    typeCast: true
                },
                timezone: 'Asia/Seoul'      // set default now() timezone // default is seoul korea
            });

            const syncdModule = await sqzSync.sync(sequelize, true);

            let transaction;
            try {
                transaction = await sequelize.transaction();

                for (item in system){
                    await syncdModule.models.System.create({
                        code: system[item].code,
                        group: system[item].group,
                        value1: system[item].name
                    }, { transaction });
                }
                
                await transaction.commit();
            } catch (err) {                
                await transaction.rollback();
                throw err;
            }

            const create = await syncdModule.models.User.create({
                id: null,
                email: 'setyourmindpark@gmail.com',
                passwd: '4a7d1ed414474e4033ac29ccb8653d9b',
                name: 'jaehunpark',
                typeCode: system.USER_LINK_GENERAL.code,
                deviceCode: system.USER_DEVICE_ANDROID.code
            });
            console.log(create.get({ plain: true }))

            const someone = await syncdModule.models.User.findOne({
                attributes:{
                    exclude: ['typeCode','deviceCode']
                },
                include: [{ 
                    model: syncdModule.models.System,
                    as : 'type',
                    attributes: [['value1','name']]
                },{ 
                    model: syncdModule.models.System,
                    as : 'device',
                    attributes: [['value1','name']]
                }],
                where: {
                    email: 'setyourmindpark@gmail.com'
                },
            })
            
            console.log(someone.get({ plain: true }));            

            process.exit(0)
        }catch(err){
            console.log(err);
        }        
    })();

});






