
// ***************************************************
// initialize to start service and configure here to need
// service에 대한 초기화는 이곳에서 모두 처리함.
// ***************************************************

exports.initialize = initialize;

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
// const baseFormatter = require('@root/base/common/formatter');
const baseSenderMail = require('@root/base/sender/mail');
const baseSenderAndorid = require('@root/base/sender/android');
const baseAuthorizer = require('@root/base/authorizer');
const baseMongoose = require('@root/base/mongoose');
const baseSequelize = require('@root/base/sequelize');
const baseAssistant = require('@root/base/assistant')
const basePagenationMysql = require('@root/base/common/pagenationMysql')
const sqzSync = require('@root/app/query/sequelize/sync');
const modules = require('@root/app/common/modules');
const toRouteRouters = require('@root/app/api');
const path = require('path');
const assetDir = config.setting.upload.local.assetDir;
const mode = config.mode;

async function initialize() {
    await initializeModule();
    return configureProtocol();
}

async function initializeModule() {
    // service module initialize. 
    // initialize module you want to use.     
    // sequelize mysql은 현재 db1개로만 서비스로직구성시에대한 모듈생성함. 추가 db를 연결하려면 sequelize경우 이곳에서 모듈을 생성하여 models을 바인딩후 modules에 bind할것.        
    const { mongoose1 } = await baseMongoose.createModules();
    const { sequelize1 } = await baseSequelize.createModules();
    const { jwtAccess, jwtRefresh } = baseAuthorizer.createModules();
    const syncdSequelize1 = await sqzSync.sync(sequelize1);         // sequelize.models 에 entity binded

    const basePlainModules = {
        assistant: baseAssistant,
        // formatter: baseFormatter,
        pagenationMysql: basePagenationMysql,
        senderMail: baseSenderMail,
        senderAndorid: baseSenderAndorid
    };

    const baseModules = {  
        mongooseModules : {
            mongoose1: mongoose1
        },   
        sequelizeModules: {
            syncdSequelize1: syncdSequelize1
        },
        jwtModules: {
            jwtAccess: jwtAccess,
            jwtRefresh: jwtRefresh
        }
    }

    modules.initialize(basePlainModules, baseModules);
}

function configureProtocol() {
    //cross doamin handling
    app.use((req, res, next) => {
        if (req.originalUrl === '/favicon.ico') return;
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials'
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(helmet());
    app.use(cors());

    if (mode === 'dev') {
        const swaggerUi = require('swagger-ui-express');
        const swaggerDocument = require('@root/app/api/swagger/document');
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    const { routers, commonRoute } = toRouteRouters;
    routers.forEach(({ customRoute, toRoute, folder, router, activate }) => {
        if (activate) {
            const callRoute = customRoute ? customRoute : commonRoute + toRoute;
            app.use(callRoute, require('@root/app/api' + folder + router));
        }
    });

    if (assetDir) app.use(express.static(path.join(rootDir, assetDir)));

    app.use((req, res, next) => {
        res.status(404).send('404 not found');
    });

    return app;
}