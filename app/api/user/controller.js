const { queryHelperModule, jwtAccessModule, jwtRefreshModule } = reqlib('/app/common/modules');
const userSql = reqlib('/app/query/queryHelper/user.sql');
const response = reqlib('/base/common/response');
const constant = reqlib('/base/common/constant');

exports.validityEmail = async (req, res, next) => {
    try {
        let code = constant.CODE_SERVICE_PROCESS_1;
        let msg = 'you can create user by using this email';
        const email = req.prop.email;
        const params = { email : email };
        const result = await queryHelperModule.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
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

        const result1 = await queryHelperModule.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
        if (result1.cnt >= 1) {
            response.apiResponse(res, {
                code: constant.CODE_SERVICE_PROCESS_2,
                msg: 'sorry . you can not this email'
            });
            return;
        };

        const result2 = await queryHelperModule.execute({ query: userSql.insertUser, data: params, expect: 'single' });

        response.apiResponse(res, {            
            msg: 'created user. login now',
            code: constant.CODE_SERVICE_PROCESS_1,            
        });
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}

exports.tokenMe = async (req, res, next) => {
    try {        
        const { email, passwd } = req.prop;
        const params1 = { email: email, passwd: passwd };
        const result = await queryHelperModule.execute({ query: userSql.selectUserInfo, data: params1, expect: 'single' });

        if (!result){
            response.apiResponse(res, {
                code: constant.CODE_SERVICE_PROCESS_2,
                msg: 'sorry . check login email and password'
            });
            return;
        }

        const userId = result.id;
        const tokenBody = { tokenId: userId };

        response.apiResponse(res, {
            msg: 'logined, take care this token',
            code: constant.CODE_SERVICE_PROCESS_1,
            data: {
                accesstoken: jwtAccessModule.generateToken(tokenBody),
                refreshtoken: jwtRefreshModule.generateToken(tokenBody)
            }
        });
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}

exports.tokenNew = async ( req, res, next ) => {
    try{
        const { accesstoken, tokenId } = req.prop;

        try{
            const decoded = jwtAccessModule.decode(accesstoken);

            if (decoded.tokenId !== tokenId){
                const error = new Error(constant.JWT_NOT_MATCH_TWO_TOKEN.msg);
                error.errorCode = constant.JWT_NOT_MATCH_TWO_TOKEN.code;
                throw error;
            }

            const tokenBody = { tokenId: tokenId };
            response.apiResponse(res, {
                msg: 'take care this token',
                code: constant.CODE_SERVICE_PROCESS_1,
                data: {                    
                    accesstoken: jwtAccessModule.generateToken(tokenBody),
                    refreshtoken: jwtRefreshModule.generateToken(tokenBody)
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

exports.me = async (req, res, next) => {
    try {
        const userId = req.prop.tokenId;        
        const params = { id: userId };
        const result = await queryHelperModule.execute({ query: userSql.selectUserInfo, data: params, expect: 'single' });        
        response.apiResponse(res, {
            msg : 'user info here',
            code: constant.CODE_SERVICE_PROCESS_1,            
            data: result
        });        
    } catch (err) {
        response.apiErrResponse(res, err);
    }
}