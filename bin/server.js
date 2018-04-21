const rootPath = require('app-root-path');
global.reqlib = rootPath.require;
const config = reqlib('/config');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = reqlib('/app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const queryHelper = reqlib('/base/queryHelper');
const loggerHelper = reqlib('/base/logger');

(async () => {
    await init();
})();

async function init() {
    try {
        const env = config.env;
        const master = cluster.isMaster;
        global.logger = await loggerHelper.getLogger();

        if (master) {
            const whatTimeIs = await queryHelper.execute({ query: 'SELECT NOW() AS now FROM DUAL', expect: 'single' });
            const now = whatTimeIs.now;
            logger.info('Hello There ! | ' + now);

            cluster.on('online', (worker) => {
                //logger.info('생성된 워커의 아이디 : ' + worker.process.pid);
            });
            cluster.on('listening', (worker, address) => {
                logger.info('created worker [ ' + worker.process.pid + ' ] is listening port : ' + address.port);
            });
            cluster.on('exit', (worker, code, signal) => {
                logger.info('died worker id : ' + worker.process.pid);
                cluster.fork();   //워커 재생성
            })
            // generate workers
            for (var i = 0; i < numCPUs; i++) {
                cluster.fork();   // Create a worker
            }

        } else {
            const apiServer = http.createServer(app).listen(config.context.port);
            apiServer.on('error', (err) => {
                throw err;
            });
        }
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
