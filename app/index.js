
// ***************************************************
// start service initialize and configure here to need
// service에 대한 초기화는 이곳에서 모두 처리함.
// ***************************************************


exports.initialize = initialize;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const baseFormatter = reqlib('/base/common/formatter');
const baseSenderMail = reqlib('/base/sender/mail');
const baseAuthorizer = reqlib('/base/authorizer');
// const baseQueryHelper = reqlib('/base/queryHelper');
const baseSequelize = reqlib('/base/sequelize');
const baseAssistant = reqlib('/base/assistant')
const baseMysqlPagenation = reqlib('/base/queryHelper/pagenation/mysql')
const sqzSync = reqlib('/app/query/sequelize/sync');
const modules = reqlib('/app/common/modules');
const toRouteRouters = reqlib('/app/api');

async function initialize(){
    await initializeModule();
    return configureProtocol();
}

async function initializeModule(){
    // service module initialize. 
    // initialize module you want to use. 
    // 기본적으로 sequelize를 사용. sequelize에서 언급에따라 퍼포먼스 이슈있을시(?) queryHelper 사용. 아님 sequelize raw query를 사용하든가 ..
    // 2개의 모듈 모두 load. 경우에따라 사용하는 모듈이 달라질수있음.
    // 현재 db1개로만 서비스로직구성시에대한 모듈생성함. 추가 db를 연결하려면 sequelize경우 이곳에서 모듈을 생성하여 models을 바인딩후 modules에 bind할것.    
    // const { queryHelper1 } = await baseQueryHelper.createModules();
    const { sequelize1 } = await baseSequelize.createModules();
    const { jwtAccess, jwtRefresh } = baseAuthorizer.createModules();
    const syncdSequelize1 = await sqzSync.sync(sequelize1);       // sequelize.models 에 entity binded

    const basePlainModule = {
        assistant: baseAssistant,
        // formatter: baseFormatter,
        mysqlPagenation: baseMysqlPagenation,
        senderMail: baseSenderMail
    };

    const baseModules = {
        // queryHelperModules: {
        //     queryHelper1: queryHelper1
        // },
        sequelizeModules: {
            syncdSequelize1: syncdSequelize1
        },
        jwtModules: {
            jwtAccess: jwtAccess,
            jwtRefresh: jwtRefresh
        }
    }
   
    modules.initialize(basePlainModule, baseModules);
}

function configureProtocol(){
    //cross doamin handling
    app.use((req, res, next) => {
        if (req.originalUrl === '/favicon.ico') return;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', `Origin,Accept, Content-Type, Authorization, Content-Length, X-Requested-With, ${config.auth.param}`);
        res.setHeader('Access-Control-Allow-Headers', `Origin,Accept, Content-Type, Authorization, Content-Length, X-Requested-With`);
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const { routers, commonRoute } = toRouteRouters;
    routers.forEach(({ customRoute, toRoute, folder, router, activate }) => {
        if (activate) {
            const callRoute = customRoute ? customRoute : commonRoute + toRoute;
            app.use(callRoute, reqlib('/app/api' + folder + router));
        }
    });

    app.use(express.static(__dirname + '/public'));
    app.use((req, res, next) => {
        res.status(404).send('404 not found');
    });

    return app;
}
