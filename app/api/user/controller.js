const { response, queryHelper, jwtAccess, jwtRefresh, formatter } = reqlib('/app/common/modules');
const userSql = reqlib('/app/query/queryHelper/user.sql');
const constant = reqlib('/app/common/constant');

exports.validityEmail = () => {
    return async (req, res, next) => {
        try {
            let code = constant.CODE_SERVICE_PROCESS_1;
            let msg = 'you can create user by using this email';
            const email = req.prop.email;
            const params = { email: email };
            const result = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
            if (result.cnt >= 1) {
                code = constant.CODE_SERVICE_PROCESS_2,
                    msg = 'sorry . you can not this email'
            };

            res.send(formatter.apiResponse({
                code: code,
                msg: msg
            }));

        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }
    
}

exports.new = () => {        
    return async (req, res, next) => {
        try {
            const { name, email, passwd } = req.prop;
            const params = { name: name, email: email, passwd: passwd };

            const result1 = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
            if (result1.cnt >= 1) {
                res.send(formatter.apiResponse({
                    code: constant.CODE_SERVICE_PROCESS_2,
                    msg: 'sorry . you can not this email'
                }));
                return;
            };

            const result2 = await queryHelper.execute({ query: userSql.insertUser, data: params, expect: 'single' });
            res.send(formatter.apiResponse({
                msg: 'created user. login now',
                code: constant.CODE_SERVICE_PROCESS_1,
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
}

exports.tokenMe = () => {
    return async(req, res, next) => {
        try {
            const { email, passwd } = req.prop;
            const params1 = { email: email, passwd: passwd };
            const result = await queryHelper.execute({ query: userSql.selectUserInfo, data: params1, expect: 'single' });

            if (!result) {
                res.send(formatter.apiResponse({
                    code: constant.CODE_SERVICE_PROCESS_2,
                    msg: 'sorry . check login email and password'
                }));
                return;
            }

            const userId = result.id;
            const tokenBody = { tokenId: userId };
            res.send(formatter.apiResponse({
                msg: 'logined, take care this token',
                code: constant.CODE_SERVICE_PROCESS_1,
                data: {
                    accesstoken: jwtAccess.generateToken(tokenBody),
                    refreshtoken: jwtRefresh.generateToken(tokenBody)
                }
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
}

exports.tokenNew = () => {
    return async(req, res, next) => {
        try {
            const { accesstoken, tokenId } = req.prop;

            try {
                const decoded = jwtAccess.decode(accesstoken);                

                if (decoded.tokenId !== tokenId) {
                    const error = new Error(constant.JWT_NOT_MATCH_TWO_TOKEN.msg);
                    error.errorCode = constant.JWT_NOT_MATCH_TWO_TOKEN.code;
                    throw error;
                }

                const tokenBody = { tokenId: tokenId };
                res.send(formatter.apiResponse({
                    msg: 'take care this token',
                    code: constant.CODE_SERVICE_PROCESS_1,
                    data: {
                        accesstoken: jwtAccess.generateToken(tokenBody),
                        refreshtoken: jwtRefresh.generateToken(tokenBody)
                    }
                }));
            } catch (err) {
                res.send(formatter.apiResponse({
                    resultCode: err.errorCode,
                    msg: err.message
                }));
            }


        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
}

exports.me = () => {
    return async(req, res, next) => {
        try {
            const userId = req.prop.tokenId;
            const params = { id: userId };
            const result = await queryHelper.execute({ query: userSql.selectUserInfo, data: params, expect: 'single' });
            res.send(formatter.apiResponse({
                msg: 'user info here',
                code: constant.CODE_SERVICE_PROCESS_1,
                data: result
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
}