//이곳에 상수를 세팅하여 에러 메시지 코드 등을 정의할것임 .

const constant = {};

//jwt
constant.JWT_EMPTY_TOKEN = { 
    code: 'E10001', 
    // msg: '토큰이 존재하지않습니다.',
    msg: 'empty token'     
}

constant.JWT_INVALID_TOKEN = { 
    code: 'E10002', 
    // msg: '유효하지않은 토큰입니다.',
    msg: 'invalid token'    
}

constant.JWT_EXPIRE_TOKEN = { 
    code: 'E10003',
    // msg: '토큰이 만료되었습니다.',
    msg: 'expire token'     
}

//validate value and property
constant.PARAMETER_NOT_EXSIST = key => {
    return {
        code: 'E21001',
        // msg: '파라미터 [ ' + key + ' ] 가 존재하지않습니다. 파라미터를 확인해주세요 ',
        msg: 'parameter [ ' + key + ' ] is not exist. pleace check parameter '        
    }
}

constant.VALIDATE_VALUE_NOT_ONLY_CHARACTERS = key => {
    return {
        code: 'E21002',
        // msg: '파라미터 [ ' + key + ' ] 의 값이 모두 문자열만 허용됩니다.',
        msg: 'parameter value of [ ' + key + ' ] is not only characters(string)'        
    }
}

constant.VALIDATE_VALUE_NOT_ONLY_NUMBER = key => {
    return {
        code: 'E21003',
        // msg: '파라미터 [ ' + key + ' ] 의 값이 모두 숫자만 허용됩니다.',
        msg: 'parameter value of [ ' + key + ' ] is not only number'        
    }
}

constant.VALIDATE_WRONG_REGEXP_FORMAT = (key, regExp) => { 
    return {
        code: 'E21004', 
        // msg: '파라미터 [ ' + key + ' ] 의 값이 정규식 [ ' + regExp + ' ] 포맷을 만족하지않습니다.',
        msg: 'parameter [ ' + key + ' ] is not [ ' + regExp + ' ] format'        
    }
}

//validate multipart
constant.MULTIPART_NOT_ALLOW_FILE_EXT = (fileName, fileExt, allowExts) => {
    return {
        code: 'E21005',
        // msg: '[ ' + fileName + ' ] 의 확장자 [ ' + fileExt + ' ] 는 허용되지않습니다. 허용되는 확장자는 ' + allowExts + ' 입니다.',
        msg: '[ ' + fileName + ' ] extension is not allow [ ' + fileExt + ' ]. only allow ' + allowExts        
    }
}

constant.MULTIPART_CAN_NOT_EXCEED_CAPACITY = (fileName, uptoSize) => {
    return {
        code: 'E21006',
        // msg: '[ ' + fileName + ' ] 파일의 용량은 [ ' + uptoSize + ' ] 를 넘을수없습니다.',
        msg: '[ ' + fileName + ' ] can not exceed [ ' + uptoSize + ' ]'              
    }
}

//system someting wrong
constant.MSG_SYSTEM_ERROR = 'server error'

//code
constant.CODE_SYSTEM_PROCESS_DONE = '0001'      // system process is done done  시스템로직 정상처리코드
constant.CODE_SYSTEM_PROCESS_ERROR = '9999'     // system process error code    시스템로직 예상치못한오류

module.exports = constant;
