
exports.apiResponse = apiResponse;
exports.apiErrResponse = apiErrResponse;

const constant = require('./constant');

function apiResponse({ resultCode, code, msg, pagenationInfo, data }) {
    if (resultCode) {
        logger.info('--------------------------- identified info start ---------------------------');
        logger.info('identified code : ' + resultCode + '   identified msg : ' + msg);
        logger.info('--------------------------- identified info end -----------------------------');
    }
    return {
        resultCode: resultCode || constant.CODE_SYSTEM_PROCESS_DONE,
        body: {
            msg: msg,
            code: code,
            pagenationInfo: pagenationInfo,
            data: data
        }
    }
}

function apiErrResponse(err) {
    logger.info('--------------------------- unexpected system error start ---------------------------');
    logger.info(err);
    logger.info('--------------------------- unexpected system error end -----------------------------');
    return {
        resultCode: constant.CODE_SYSTEM_PROCESS_ERROR,
        msg: constant.MSG_SYSTEM_ERROR
    };
}
