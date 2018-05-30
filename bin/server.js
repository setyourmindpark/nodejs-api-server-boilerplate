const rootPath = require('app-root-path');
global.reqlib = rootPath.require;

const config = reqlib('/config');
const https = require('https');
const http = require('http');
const cluster = require('cluster');
const loggerHelper = reqlib('/base/logger');
const numCPUs = require('os').cpus().length;
const app =  reqlib('/app');
const port = config.base.port;
const env = config.env;
const master = cluster.isMaster;   

(async () => {    
    try {
        // system module initialize        
        loggerHelper.initialize();
        global.logger = await loggerHelper.getLogger();        
                
        const protocol = await app.initialize();
        
        if (master) {
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
            const apiServer = http.createServer(protocol).listen(port);
            apiServer.on('error', (err) => {
                throw err;
            });
        }
    } catch (err) {
        console.log(err);
        process.exit(1)
    }

})()
