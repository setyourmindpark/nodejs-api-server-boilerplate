
const constant = reqlib('/base/constant');

/**
* 이메일 패턴유효성 검사 수행
* @param {String} 유효성 검사대상 이메일
* @return {JSON} 검사결과반환 {isValidate : 'true|false (검사결과 적합여부)', msg : '클라이언트에게 보낼 메시지'}
* @private
*/
exports.checkEmailRules = (email) => {
    const pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    const isValidate = pattern.test(email);
    if (!isValidate) {
        const prop = constant.VALIDATE_WRONG_EMAIL_FORMAT;
        return {
            isValidate: false,
            code: prop.code,
            msg: prop.msg
        }
    }
    return {
        isValidate: true
    }
}

/**
* 비밀번호 패턴유효성 검사 수행
* 조건1. 6~20 영문 대소문자
* 조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
* @param {String} 유효성 검사대상 비밀번호
* @return {JSON} 검사결과반환 {isValidate : 'true|false (검사결과 적합여부)', msg : '클라이언트에게 보낼 메시지'}
* @private
*/
exports.checkPasswdRules = (passwd) => {
    const pattern = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    const isValidate = pattern.test(passwd);
    if (!isValidate) {
        const prop = constant.VALIDATE_WRONG_PASSWD_FORMAT;
        return {
            isValidate: false,
            code: prop.code,
            msg: prop.msg
        }
    }
    return {
        isValidate: true
    }
}

/**
* 전화번호 패턴유효성 검사 수행
* 전화번호 – 예, 123-123-2344 혹은 123-1234-1234
* @param {String} 유효성 검사대상 전화번호
* @return {JSON} 검사결과반환 {isValidate : 'true|false (검사결과 적합여부)', msg : '클라이언트에게 보낼 메시지'}
* @private
*/
exports.checkTelNodRules = (telNo) => {
    const pattern = /(\d{3}).*(\d{3}).*(\d{4})/;
    const isValidate = pattern.test(telNo);
    if (!isValidate) {
        const prop = constant.VALIDATE_WRONG_TEL_NO_FORMAT;
        return {
            isValidate: false,
            code: prop.code,
            msg: prop.msg
        }
    }
    return {
        isValidate: true
    }
}

/**
* 핸드폰번호 패턴유효성 검사 수행
* 핸드폰번호 – 예, 010-1234-5678
* @param {String} 유효성 검사대상 핸드폰번호
* @return {JSON} 검사결과반환 {isValidate : 'true|false (검사결과 적합여부)', msg : '클라이언트에게 보낼 메시지'}
* @private
*/
exports.checkPhoneNodRules = (phoneNo) => {
    const pattern = /(\d{3}).*(\d{4}).*(\d{4})/;
    const isValidate = pattern.test(phoneNo);
    if (!isValidate) {
        const prop = constant.VALIDATE_WRONG_PHONE_NO_FORMAT;
        return {
            isValidate: false,
            code: prop.code,
            msg: prop.msg
        }
    }
    return {
        isValidate: true
    }
}
