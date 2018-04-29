
exports.apiResponse = apiResponse;
exports.apiErrResponse = apiErrResponse;

const constant = reqlib('/base/common/constant');

function apiResponse({ resultCode, code, msg, pagenationInfo, data }) {
    if (resultCode) {
        logger.info('--------------------------- identified error start ---------------------------');
        logger.info('errorCode : ' + resultCode + '   msg : ' + msg);
        logger.info('--------------------------- identified error end -----------------------------');
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
    return apiResponse({
        resultCode: constant.CODE_SYSTEM_PROCESS_ERROR,
        msg: constant.MSG_SYSTEM_ERROR
    });
}
