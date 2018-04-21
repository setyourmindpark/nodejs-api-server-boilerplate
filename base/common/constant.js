//이곳에 상수를 세팅하여 에러 메시지 코드 등을 정의할것임 .

const constant = {};

//jwt
constant.JWT_EMPTY_TOKEN = { code: 'E10000', msg: 'empty token' }
constant.JWT_INVALID_TOKEN = { code: 'E10001', msg: 'invalid token' }
constant.JWT_EXPIRE_TOKEN = { code: 'E10002', msg: 'expire token' }
constant.JWT_NOT_MATCH_TWO_TOKEN = { code: 'E10003', msg: 'not match token owner' }

//validate value and property
constant.VALIDATE_VALUE_NOT_ONLY_CHARACTERS = (key) => {
    return {
        code: 'E21002',
        msg: `parameter value of [ ${key} ] is not only characters(string)`
    }
}

constant.VALIDATE_VALUE_NOT_ONLY_NUMBER = (key) => {
    return {
        code: 'E21002',
        msg: `parameter value of [ ${key} ] is not only number`
    }
}

constant.VALIDATE_PROPERTY_NOT_MATCH = (obj, key) => {
    return {
        code: 'E21000',
        msg: `parameter property type of [ ${key} ] is not [ ${obj[key].p_type || 'string'} ]. please check parameter property type`
    }
}
constant.PARAMETER_NOT_EXSIST = key => {
    return {
        code: 'E21001',
        msg: `parameter [ ${key} ] is not exsist. please check parameter`
    }
}

//validate extra
constant.VALIDATE_WRONG_EMAIL_FORMAT = { code: 'E21003', msg: 'please check format of email' }
constant.VALIDATE_WRONG_PASSWD_FORMAT = { code: 'E21004', msg: 'please check passwd' }
constant.VALIDATE_WRONG_TEL_NO_FORMAT = { code: 'E21005', msg: 'please check telephone number' }
constant.VALIDATE_WRONG_PHONE_NO_FORMAT = { code: 'E21006', msg: 'please check phone number' }

//combination of extra and key ( key + extra message )
// if you got error while processing in checker logic, combine msg of param key and chekcer error msg
constant.COMBINATION_PARAM_KEY_AND_CHECKER_MESSAGE = (key, errCode, errMsg) => {
    return {
        code: errCode,
        msg: `parameter value of [ ${key} ] is wrong format . ${errMsg} `
    }
}

//validate multipart
constant.MULTIPART_CAN_NOT_INSPECT_PARAMETER = { code: 'system err code', msg: 'can not inspect multipart parameters' }
constant.MULTIPART_NOT_ALLOW_FILE_EXT = (fileName, fileExt, allowExts) => {
    return {
        code: 'E31001',
        msg: `${fileName} extention is not allow ${fileExt}, only allow ${allowExts}`
    }
}

constant.MULTIPART_CAN_NOT_EXCEED_CAPACITY = (fileName, uptoSize) => {
    return {
        code: 'E31004',
        msg: `${fileName} can not exceed ${uptoSize}`
    }
}
constant.MULTIPART_CAN_NOT_MAKE_DIR = (path) => {
    return {
        code: 'E31002',
        msg: `can not make dir ${path}`
    }
}

constant.MULTIPART_NOT_UPLOADED = (fileName) => {
    return {
        code: 'E31003',
        msg: `${fileName} is not uploaded`
    }
}

//file upload
constant.UPLOAD_FILE_HAS_ERROR = '';

//system someting wrong
constant.MSG_SYSTEM_ERROR = 'server error. call jaehunpark'
constant.SYSTEM_SOMETHING_WRONG_IN_ASSISTANT = 'something wrong is in assistant'


//code
constant.CODE_CLIENT_HAS_FAULT = '1111'         // client someting wrong code
constant.CODE_SYSTEM_PROCESS_DONE = '0001'      // system process is done done  시스템로직 정상처리코드
constant.CODE_SYSTEM_PROCESS_ERROR = '9999'     // system process error code    시스템로직 예상치못한오류
constant.CODE_SERVICE_PROCESS_1 = '001'         // service process is done code 서비스로직 정상처리코드 1
constant.CODE_SERVICE_PROCESS_2 = '002'         // service process code 2       서비스로직 분기코드2
constant.CODE_SERVICE_PROCESS_3 = '003'         // service process code 3       서비스로직 분기코드3
constant.CODE_SERVICE_PROCESS_4 = '004'         // service process code 4       서비스로직 분기코드4
constant.CODE_SERVICE_PROCESS_5 = '005'         // service process code 5       서비스로직 분기코드5

module.exports = constant;
