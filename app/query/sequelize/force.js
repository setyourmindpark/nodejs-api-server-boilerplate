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


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

(async () => {
    if (isRoot()) {
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

        models.User.hasMany(models.Article, { foreignKey: 'userId', sourceKey: 'id' });
        models.Article.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });

        await sequelize.sync({ force: true });      
        
        //################## insert start ##################
        const resultEntity1 = await models.User.create({
            id : null,
            email: 'setyourmindpark@gmail.com',
            passwd : '0000',
            name : '박재훈'
        });
        console.log(resultEntity1.get({ plain: true }))

        await models.User.create({
            id: null,
            email: 'chulsookim@gmail.com',
            passwd: '0000',
            name: '김철수'
        });

        await models.Book.create({
            name: '자바의정석',
            publish: '남궁성'
        });

        await models.Book.create({
            name: '토비의스프링'            
        });

        await models.Book.create({            
            name: 'docker'            
        });
        await models.Book.create({
            name: 'kubernetes'
        });

        await models.UserBook.create({
            userId: 1,
            bookId : 1
        });

        await models.UserBook.create({
            userId: 1,
            bookId: 2
        });

        await models.UserBook.create({
            userId: 2,
            bookId: 2
        });

        await models.UserBook.create({
            userId: 2,
            bookId: 3
        });

        await models.Article.create({
            userId: 1,
            title: '게시글1',
            content: '내용1'
        });

        await models.Article.create({
            userId: 1,
            title: '게시글2',
            content: '내용2'
        });

        await models.Article.create({
            userId: 1,
            title: '게시글3',
            content: '내용3'
        });
        //################## insert end ##################

        //################## update start ##################
        const resultEntity2 = await models.User.update({            
            email: 'update setyourmindpark@gmail.com',
            updateAt: Sequelize.fn('NOW')
        },{
            where : { id : 1 }
        });
        console.log(resultEntity2)
        //################## update end ##################

        //################## transaction start ##################
        let transaction;
        try{
            transaction = await sequelize.transaction();
            
            await sleep(1000)
            await models.User.create({                
                email: '2setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });

            await sleep(1000)
            await models.User.create({                
                email: '3setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });

            await sleep(1000)
            await models.User.create({
                email: '4setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });
            await transaction.commit();
        }catch(err){
            await transaction.rollback();
        }
        //################## transaction end ##################

        //################## select start ##################
        // count
        const count = await models.User.count({
            where : {
                name : '박재훈'
            }
        })
        console.log('######################### count')
        console.log(count);
        console.log('######################### count')

        // findAll // http://docs.sequelizejs.com/manual/tutorial/models-usage.html
        const users = await models.User.findAll({
            raw: true,
            where : {
                name: '박재훈'
            },
            order: [
                ['createAt','DESC'] // DESC 반드시 대문자
            ],
            offset: 2,
            limit: 100
        })
        console.log('######################### findAll')
        console.log(users);
        console.log('######################### findAll')

        //findOne
        const someone = await models.User.findOne({
            raw: true,
            where: {
                email: 'update setyourmindpark@gmail.com'
            },            
        })
        console.log('######################### findOne')
        console.log(someone);
        console.log('######################### findOne')

        // hasMany    
        const hasMany = await models.User.find({
            where: {
                id: 1
            },
            include: { model: models.Article }
        })
        console.log('######################### hasMany')
        console.log(hasMany.get({ plain: true }));
        console.log('######################### hasMany')

        const belongsTo = await models.Article.find({
            where: {
                id: 1
            },
            include: { model: models.User}
        })
        console.log('######################### belongsTo')
        console.log(belongsTo.get({ plain: true }));
        console.log('######################### belongsTo')

        process.exit(1)

    } else {
        console.log('*****************WARNING*****************')
        console.log('YOU MUST EXECUTE THIS ROOT USER')
        console.log('*****************WARNING*****************')
    }
})();



