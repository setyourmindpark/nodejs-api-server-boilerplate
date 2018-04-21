const config = reqlib('/config');

exports.getLogger = getLogger;

let logger = undefined;
const type = config.context.logger;
if (type === 'local') logger = require('./local');
else if (type === 'fluentd') logger = require('./fluentd');

function getLogger(...args) {
    return logger.getLogger(args[0], args[1], args[2], args[3], args[4]);
}
