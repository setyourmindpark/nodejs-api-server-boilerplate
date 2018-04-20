
exports.apiResponse = apiResponse;
exports.apiErrResponse = apiErrResponse;
exports.notFoundResponse = notFoundResponse;

const constant = reqlib('/app/base/constant');
const debug = require('debug')('log');

// contoller에서 처리된 response body 에 실어서보낼 데이터들을 response
// 예측할수있는 에러에대한 정보까지 이곳에서 처리한다. default는 constant.CODE_PROCESS_JOB_WELL_DONE
function apiResponse(res, { resultCode, code, msg, pagenationInfo, data }) {
    if (resultCode) {
        logger.info('--------------------------- identified error start ---------------------------');
        logger.info('errorCode : ' + resultCode + '   msg : ' + msg);
        logger.info('--------------------------- identified error end -----------------------------');
    }

    res.status(resultCode === constant.CODE_SYSTEM_PROCESS_ERROR ? 500 : 200).send({
        resultCode: resultCode || constant.CODE_SYSTEM_PROCESS_DONE,
        body: {
            msg: msg,
            code: code,
            pagenationInfo: pagenationInfo,
            data: data
        }
    });
};

// 서버개발자가 예측하지못한 시스템 에러를 처리
function apiErrResponse(res, err) {
    logger.info('--------------------------- unexpected system error start ---------------------------');
    logger.info(err);
    logger.info('--------------------------- unexpected system error end -----------------------------');
    apiResponse(res, {
        resultCode: constant.CODE_SYSTEM_PROCESS_ERROR,
        msg: constant.MSG_SYSTEM_ERROR
    });
}

// 404 not found
function notFoundResponse(res) {
    res.status(404).send('404 not found');
}
