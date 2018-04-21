
exports.initialize = initialize;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = reqlib('/config');
const constant = reqlib('/base/common/constant');
const response = reqlib('/base/common/response');
const queryHelper = reqlib('/base/queryHelper');
const authorizer = reqlib('/base/authorizer');
//const shell = require('shelljs');
const toRouteRouters = reqlib('/app/api');
const env = config.env;

async function initialize(){
    try {
        // service module initialize. 
        // initialize module you want to use.    
        await queryHelper.initialize();
        authorizer.initialize();
                
        //cross doamin handling
        app.use((req, res, next) => {
            if (req.originalUrl === '/favicon.ico') return false;        //브라우저 사이트 아이콘 favicon 현재정의하지않기에 return false.
            //favicon 있을시 해제해야함. 없을때 현재 분기처리하지않으면 아래 app level middleware까지 오게됨 .
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
            if (activate){
                const callRoute = customRoute ? customRoute : commonRoute + toRoute;
                app.use(callRoute, reqlib('/app/api' + folder + router));                
            }            
        });       
        
        app.use(express.static(__dirname + '/public'));        
        app.use((req, res, next) => {
            response.notFoundResponse(res);
        });

        return app;
    } catch (err) {
        throw err;
    }
}
