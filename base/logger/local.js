const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
const path = require('path');
const file = require('@root/base/common/file');
const rootPath = require('app-root-path');
exports.getLogger = getLogger;

async function getLogger() {
    const { level, dir, fileName, timestamp } = config.setting.logger.local;
    let path = dir;

    if (!path) path = rootPath.path + '/log';
    if (!file.isExsistDir(path)) file.mkdir(path);

    const dailyConfig = {        
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',        
        json : true,
    };

    dailyConfig.dirname = path;
    dailyConfig.filename = '%DATE%.' + fileName;
    dailyConfig.timestamp = () => moment().tz(timestamp).format('YYYY-MM-DD HH:mm ss.SSS');

    const logger = new (winston.Logger)({
        level: level,                       // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5        
        transports: [
            new (winston.transports.Console)({
                colorize: true
            }),
            new (winston.transports.DailyRotateFile)(dailyConfig)
        ]
    });
    return logger;
}
