//assistant 폴더는 미들웨어에서 처리하는 로직에대한 파일을 모두 넣음 .
//assistant 이외의 폴더에는 controller에서 로직수행중에 필요한 로직에대한 폴더임.

/**
 * Module exports.
 * @public
 */
exports.validate = validate;
exports.unifyAllProps = unifyAllProps;
//http://www.codejs.co.kr/useful-regular-expression/?ckattempt=1

/**
 * Module dependencies.
 * @private
 */
const validator = require('./validator');
const uploader = require('./uploader');
const constant = reqlib('/base/common/constant');
const formatter = reqlib('/base/common/formatter');

/**
* 유효성검사를 수행
* @param {JSON, function}   
* ex) {파라미터이름 : {require : true, type : string or regExp},  ...  }   //get 방식의 api 요청일경우 default는 string.
* delegateFunction존재시 validate 수행결과를 callback으로 router( 호출시점 ) 에서 받을시 정의하여 사용. callback으로 보내줌.( middleware, validate result )
* delegateFunction없을시 default는 formatter에서 바로 response를 error code와 message를 보냄.
* @return {express middlware}
* @public
*/
function validate(
    { params:toValidateParam, body:toValidateBody, query:toValidateQuery, multipart:toValidateMultipart }, 
    delegateFunction) { 
    return (req, res, next) => {
        (async () => {

            try{
                const { params: reqParams, query: reqQuery, body: reqBody } = req;

                if (toValidateParam) {
                    const { isValidate, code, msg } = validator.validateParams(reqParams, toValidateParam);
                    if (!isValidate) {
                        if (delegateFunction) {
                            delegateFunction(
                                { req: req, res: res, next: next },
                                { code: code, msg: msg })
                        } else {
                            res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
                        }
                        return;
                    }
                }

                if (toValidateQuery) {
                    const { isValidate, code, msg } = validator.validateQuery(reqQuery, toValidateQuery);
                    if (!isValidate) {
                        if (delegateFunction) {
                            delegateFunction(
                                { req: req, res: res, next: next },
                                { code: code, msg: msg })
                        } else {
                            res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
                        }
                        return;
                    }
                }

                if (toValidateBody) {
                    const { isValidate, code, msg } = validator.validateBody(reqBody, toValidateBody);
                    if (!isValidate) {
                        if (delegateFunction) {
                            delegateFunction(
                                { req: req, res: res, next: next },
                                { code: code, msg: msg })
                        } else {
                            res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
                        }
                        return;
                    }
                }

                if (toValidateMultipart) {
                    const { isValidate, inspectedObj, code, msg } = await validator.validateMultipart(req, toValidateMultipart);
                    if (!isValidate) {
                        if (delegateFunction) {
                            delegateFunction(
                                { req: req, res: res, next: next },
                                { code: code, msg: msg })
                        } else {
                            res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
                        }
                        return;
                    } else {
                        const { files: toValidateFile, feilds } = toValidateMultipart;
                        await uploader.uploadFile(req, inspectedObj, toValidateFile);
                    }
                }
                next();
            }catch(err){
                if (delegateFunction) {
                    delegateFunction(
                        { req: req, res: res, next: next },
                        { code: constant.CODE_SYSTEM_PROCESS_ERROR, msg: constant.MSG_SYSTEM_ERROR })
                } else {                    
                    res.status(500).send(formatter.apiErrResponse(err));
                }                
            }                       
        })();
    }
}

/**
* request 로 들어온 모든 paramter 를 rep.prop 프로퍼티에 바인딩
* @param
* @return {express middlware}
* @public
*/
function unifyAllProps() {
    return (req, res, next) => {
        req.prop = Object.assign(
            req.prop || {},
            req.user || {},            
            req.query || {},
            req.params || {},
            req.body || {},
            req.files || {},
            req.fields || {}
        );
        logger.info('--------------------------- request data start ---------------------------');
        logger.info(JSON.stringify(req.prop));
        logger.info('--------------------------- request data end   ---------------------------');
        next();
    }
}

