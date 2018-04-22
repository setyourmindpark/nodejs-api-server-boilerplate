
exports.configure = configure;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const config = reqlib('/config');
const response = reqlib('/base/common/response');
const toRouteRouters = reqlib('/app/api');

function configure(){
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
