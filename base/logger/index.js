const config = reqlib('/config');

exports.initialize = initialize;

const type = config.context.logger;

function initialize(){
    let logger = undefined;

    if (type === 'local'){
        logger = require('./local');
    } else if (type === 'fluentd'){
        logger = require('./fluentd');
    } 

    return logger;
}

