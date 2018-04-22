
exports.initializeModule = initializeModule;
exports.configureProtocol = configureProtocol;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const config = reqlib('/config');
const response = reqlib('/base/common/response');
const authorizer = reqlib('/base/authorizer');
const queryHelper = reqlib('/base/queryHelper');
const sequelize = reqlib('/base/sequelize');
const toRouteRouters = reqlib('/app/api');

async function initializeModule(){
    // service module initialize. 
    // initialize module you want to use. 
    // 기본적으로 sequelize를 사용. sequelize에서 언급에따라 퍼포먼스나 트랜잭션 이슈와같은 사항으로는 queryHelper를 사용.
    // 2개의 모듈 모두 load. 경우에따라 사용하는 모듈이 달라질수있음.
    const { queryHelperModule1 } = await queryHelper.createModules();
    const { sequelizeModule1 } = await sequelize.createModules();
    const { jwtAcess, jwtRefresh } = authorizer.createModules();
    reqlib('/app/common/modules').initialize(
        queryHelperModule1,
        sequelizeModule1,
        jwtAcess,
        jwtRefresh
    )    
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
    app.use(bodyParser.urlencoded({ extended: false }));

    const { routers, commonRoute } = toRouteRouters;
    routers.forEach(({ customRoute, toRoute, folder, router, activate }) => {
        if (activate) {
            const callRoute = customRoute ? customRoute : commonRoute + toRoute;
            app.use(callRoute, reqlib('/app/api' + folder + router));
        }
    });

    app.use(express.static(__dirname + '/public'));
    app.use((req, res, next) => {
        response.notFoundResponse(res);
    });

    return app;
}
