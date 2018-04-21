const winston = require('winston');
const config = reqlib('/config');
const file = reqlib('/base/assistant/file');
const rootPath = require('app-root-path');
exports.getLogger = getLogger;

async function getLogger() {
    try {
        const { level, filePath, fileName  } = config.setting.logger.local;        
        let path = filePath;
        
        if (!path) path = rootPath.path + '/log';        
        if (!file.isExsistDir(path)) file.mkdir(path);        

        const logger = new (winston.Logger)({
            level: level,            // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
            transports: [
                new (winston.transports.Console)({
                    colorize: true
                }),
                new winston.transports.File({ filename: path+'/'+fileName })
            ]
        });
        return logger;
    } catch (err) {
        throw err;
    }
}
