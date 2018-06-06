exports.getLogger = getLogger;

const winston = require('winston');

async function getLogger() {
    const settingConfig = config.setting.logger.fluentd;
    const { level, tag, host, port, timeout } = settingConfig;
    const toNumPort = parseInt(port);
    const toNumTimeout = parseInt(timeout);

    await isConnected(tag, host, toNumPort, toNumTimeout);
    const flunetdConfig = {
        host: host,
        port: toNumPort,
        timeout: toNumTimeout,
        requireAckResponse: true // Add this option to wait response from Fluentd certainly
    };
    const fluentTransport = require('fluent-logger').support.winstonTransport();
    const logger = new (winston.Logger)({
        level: level,            // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
        transports: [new fluentTransport(tag, flunetdConfig), new (winston.transports.Console)()]
    });
    return logger;
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
