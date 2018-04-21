const queryHelper = reqlib('/base/queryHelper');
const userSql = reqlib('/app/model/sql/user.sql');
const response = reqlib('/base/common/response');
const constant = reqlib('/base/common/constant');
const authorizer = reqlib('/base/authorizer');

exports.checkEmail = async (req, res, next) => {
    try {
        let code = constant.CODE_SERVICE_PROCESS_1;
        let msg = 'you can create user by using this email';
        const email = req.prop.email;
        const params = { email : email };
        const result = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
        if(result.cnt >= 1){            
            code = constant.CODE_SERVICE_PROCESS_2,
            msg = 'sorry . you can not this email'
        };
 
        response.apiResponse(res, {
            code: code, 
            msg: msg
        });

    } catch (err) {
        response.apiErrResponse(res, err);
    } 
}
 
exports.new = async (req, res, next) => {        
    try {
        const { name, email, passwd } = req.prop;       
        const params = { name: name, email: email, passwd: passwd };

        const result1 = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
        if (result1.cnt >= 1) {
            response.apiResponse(res, {
                code: constant.CODE_SERVICE_PROCESS_2,
                msg: 'sorry . you can not this email'
            });
            return;
        };

        const result2 = await queryHelper.execute({ query: userSql.insertUser, data: params, expect: 'single' });

        response.apiResponse(res, {            
            msg: 'created user. login now',
            code: constant.CODE_SERVICE_PROCESS_1,            
        });
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}

exports.login = async (req, res, next) => {
    try {        
        const { email, passwd } = req.prop;
        const params1 = { email: email, passwd: passwd };
        const result = await queryHelper.execute({ query: userSql.selectUserInfo, data: params1, expect: 'single' });

        if (!result){
            response.apiResponse(res, {
                code: constant.CODE_SERVICE_PROCESS_2,
                msg: 'sorry . check login email and password'
            });
            return;
        }

        const userId = result.id;
        const tokenBody = { id: userId };

        response.apiResponse(res, {
            msg: 'logined, take care this token',
            code: constant.CODE_SERVICE_PROCESS_1,
            data: {
                accesstoken: authorizer.generateAccessToken(tokenBody),
                refreshtoken: authorizer.generateRefreshToken(tokenBody)
            }
        });
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}

exports.newToken = async ( req, res, next ) => {
    try{
        const { accesstoken, id } = req.prop;

        try{
            const decoded = authorizer.decodeAccessToken(accesstoken);

            if (decoded.id !== id){
                const error = new Error(constant.JWT_NOT_MATCH_TWO_TOKEN.msg);
                error.errorCode = constant.JWT_NOT_MATCH_TWO_TOKEN.code;
                throw error;
            }

            const tokenBody = { id: id };
            response.apiResponse(res, {
                msg: 'take care this token',
                code: constant.CODE_SERVICE_PROCESS_1,
                data: {                    
                    accesstoken: authorizer.generateAccessToken(tokenBody),
                    refreshtoken: authorizer.generateRefreshToken(tokenBody)
                }
            });
        }catch(err){
            response.apiResponse(res, {
                resultCode: err.errorCode,
                msg: err.message
            });
        }
        

    }catch(err){
        response.apiErrResponse(res, err);
    }
}

exports.info = async (req, res, next) => {
    try {
        const userId = req.prop.id;        
        const params = { id: userId };
        const result = await queryHelper.execute({ query: userSql.selectUserInfo, data: params, expect: 'single' });        
        response.apiResponse(res, {
            msg : 'user info here',
            code: constant.CODE_SERVICE_PROCESS_1,            
            data: result
        });        
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}