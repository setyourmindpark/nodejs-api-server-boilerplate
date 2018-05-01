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
const dottie = require('dottie');
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
    

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    (async () => {
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

        //################## insert start ##################
        const resultEntity1 = await syncdModule.models.User.create({
            id: null,
            email: 'setyourmindpark@gmail.com',
            passwd: '0000',
            name: '박재훈'
        });
        console.log(resultEntity1.get({ plain: true }))

        await syncdModule.models.User.create({
            id: null,
            email: 'chulsookim@gmail.com',
            passwd: '4a7d1ed414474e4033ac29ccb8653d9b',
            name: '김철수'
        });

        await syncdModule.models.Memo.create({
            userId: 1,
            title: '메모제목1',
            content: '메모내용1'
        });

        await syncdModule.models.Memo.create({
            userId: 1,
            title: '메모제목2',
            content: '메모내용2'
        });

        await syncdModule.models.Memo.create({
            userId: 1,
            title: '메모제목3',
            content: '메모내용3'
        });

        await syncdModule.models.Tag.create({
            name: '자바의정석'
        });

        await syncdModule.models.Tag.create({
            name: '토비의스프링'
        });

        await syncdModule.models.Tag.create({
            name: 'docker'
        });

        await syncdModule.models.Tag.create({
            name: 'kubernetes'
        });

        await syncdModule.models.MemoTag.create({
            memoId: 1,
            tagId: 1
        });

        await syncdModule.models.MemoTag.create({
            memoId: 1,
            tagId: 2
        });

        await syncdModule.models.MemoTag.create({
            memoId: 2,
            tagId: 2
        });

        await syncdModule.models.MemoTag.create({
            memoId: 2,
            tagId: 3
        });

        //################## insert end ##################

        //################## update start ##################
        const resultEntity2 = await syncdModule.models.User.update({
            passwd: '4a7d1ed414474e4033ac29ccb8653d9b',
            updateAt: Sequelize.fn('NOW')
        }, {
                where: { id: 1 }
            });
        console.log(resultEntity2)
        //################## update end ##################

        //################## transaction start ##################
        let transaction;
        try {
            transaction = await sequelize.transaction();

            await sleep(1000)
            await syncdModule.models.User.create({
                email: '2setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });

            await sleep(1000)
            await syncdModule.models.User.create({
                email: '3setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });

            await sleep(1000)
            await syncdModule.models.User.create({
                email: '4setyourmindpark@gmail.com',
                passwd: '0000',
                name: '박재훈'
            }, { transaction });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
        //################## transaction end ##################

        //################## select start ##################
        // count
        const count = await syncdModule.models.User.count({
            where: {
                name: '박재훈'
            }
        })
        console.log('######################### count')
        console.log(count);
        console.log('######################### count')

        // findAll // http://docs.sequelizejs.com/manual/tutorial/models-usage.html
        const users = await syncdModule.models.User.findAll({
            raw: true,
            where: {
                name: '박재훈'
            },
            order: [
                ['createdAt', 'DESC'] // DESC 반드시 대문자
            ],
            offset: 2,
            limit: 100
        })
        console.log('######################### findAll')
        console.log(users);
        console.log('######################### findAll')

        //findOne
        const someone = await syncdModule.models.User.findOne({
            //raw: true,
            where: {
                email: 'setyourmindpark@gmail.com'
            },
        })
        console.log('######################### findOne')
        console.log(someone.get({ plain: true }));
        console.log('######################### findOne')

        // hasMany    
        const hasMany = await syncdModule.models.User.find({
            where: {
                id: 1
            },
            include: { model: syncdModule.models.Memo }
        })
        console.log('######################### hasMany')
        console.log(hasMany.get({ plain: true }));
        console.log('######################### hasMany')

        const belongsTo = await syncdModule.models.Memo.find({
            where: {
                id: 1
            },
            include: [{
                model: syncdModule.models.User,
                attributes: ['name', 'email'],
            }]
        })
        console.log('######################### belongsTo')
        console.log(belongsTo.get({ plain: true }));
        console.log('######################### belongsTo')

        const hasMany2 = await syncdModule.models.MemoTag.findAll({
            attributes: {
                //include: ['createAt'],
                exclude: ['memoId', 'tagId', 'updatedAt']
            },
            where: { memoId: 1 },
            include: [{
                model: syncdModule.models.Memo,
                attributes: ['title', 'content'],
                include: [{
                    model: syncdModule.models.User,
                    attributes: ['email', 'name']
                }]
            }, {
                model: syncdModule.models.Tag,
                attributes: ['name'],
                where: { name: '자바의정석' }
            }]
        })
        console.log('######################### hasMany2')
        const data = hasMany2.map(node => {
            return node.get({ plain: true });
        })
        console.log(data);
        // console.log(dottie.transform(hasMany2));
        console.log('######################### hasMany2')

        console.log('######################### findOrCreate')
        const findOrCreate = await syncdModule.models.Tag.findOrCreate({
            where: { name: 'docker1' },
            defaults: { name: 'Technical Lead JavaScript' }
        })

        const isCreated = findOrCreate[1];
        if (isCreated) {
            console.log('created');
            console.log(findOrCreate[0].dataValues) //생성된정보가져옴
        } else {
            console.log('not created. already exist')
            console.log(findOrCreate[0].dataValues) //기존정보가져옴
        }

        console.log('######################### findOrCreate')


        process.exit(0)

    })();

});






