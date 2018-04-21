const winston = require('winston');
const config = reqlib('/config');

exports.getLogger = getLogger;

async function getLogger() {
    try {
        const fluentdConfig = config.setting.logger.fluentd;        
        const { level, tag, host } = fluentdConfig;
        const port = parseInt(fluentdConfig.port);
        const timeout = parseInt(fluentdConfig.timeout);

        await isConnected(tag, host, port, timeout);
        const config = {
            host: host,
            port: port,
            timeout: timeout,
            requireAckResponse: true // Add this option to wait response from Fluentd certainly
        };
        const fluentTransport = require('fluent-logger').support.winstonTransport();
        const logger = new (winston.Logger)({
            level: level,            // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
            transports: [new fluentTransport(tag, config), new (winston.transports.Console)()]
        });
        return logger;
    } catch (err) {
        throw err;
    }
}

async function isConnected(tag, host, port, timeout) {
    return new Promise((resolve, reject) => {
        const sender = require('fluent-logger').createFluentSender(tag, {
            host: host,
            port: port,
            timeout: timeout,
            requireAckResponse: true
        });
        sender.on('error', (error) => {
            reject(error);
        });
        sender.on('connect', () => {
            resolve();
        });
        sender.emit('label', { message: 'This is a message' });
    })
}
