const { queryHelper, sequelize, jwtAccess, jwtRefresh } = reqlib('/app/common/modules');
const { User, System } = sequelize.models;
const formatter = reqlib('/app/common/formatter');
const response = reqlib('/app/common/constant/response');
const system = reqlib('/app/common/constant/system');
const message = reqlib('/app/common/message');

exports.validityEmail = () => {
    return async (req, res, next) => {
        try {
            let code = response.CODE_SERVICE_PROCESS_1;
            let msg = '계정을 만들수있습니다.';
            const { email } = req.prop;  
            //const result = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
            const count = await User.count({
                where: { email: email }
            })

            if (count >= 1) {
                code = response.CODE_SERVICE_PROCESS_2,
                msg = '현재사용중인 이메일입니다'
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
            //const result1 = await queryHelper.execute({ query: userSql.selectEmailCount, data: params, expect: 'single' });
            const count = await User.count({
                where: { email: email, }
            })

            if (count >= 1) {
                res.send(formatter.apiResponse({
                    code: response.CODE_SERVICE_PROCESS_2,
                    msg: '현재 사용중인 이메일입니다.'
                }));
                return;
            };

            const create = await User.create({
                name: name,
                email: email,
                passwd: passwd,
                typeCode: system.USER_LINK_GENERAL.code                
            });

            res.send(formatter.apiResponse({
                msg: '계정을 생성하였습니다.',
                code: response.CODE_SERVICE_PROCESS_1,
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
            const someone = await User.findOne({
                where: {
                    email: email,
                    passwd: passwd
                },
            })

            if (!someone) {
                res.send(formatter.apiResponse({
                    code: response.CODE_SERVICE_PROCESS_2,
                    msg: '이메일과 비밀번호를 확인해주세요'
                }));
                return;
            }

            const { id } = someone.get({plain:true});
            const tokenBody = { tokenId: id };
            res.send(formatter.apiResponse({
                msg: '인증되었습니다. 토큰을 저장해주세요.',
                code: response.CODE_SERVICE_PROCESS_1,
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
                    const error = new Error(response.JWT_NOT_MATCH_TWO_TOKEN.msg);
                    error.errorCode = response.JWT_NOT_MATCH_TWO_TOKEN.code;
                    throw error;
                }

                const tokenBody = { tokenId: tokenId };
                res.send(formatter.apiResponse({
                    msg: '토큰을 저장해주세요.',
                    code: response.CODE_SERVICE_PROCESS_1,
                    data: {
                        accesstoken: jwtAccess.generateToken(tokenBody),
                        refreshtoken: jwtRefresh.generateToken(tokenBody)
                    }
                }));
            } catch (err) {
                const customMessage = message.customJwtMessage(err.errorCode);
                res.send(formatter.apiResponse({
                    resultCode: err.errorCode,
                    msg: customMessage
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
            const id = req.prop.tokenId;            
            const someone = await User.findOne({
                attributes: {
                    include: ['id', 'email', 'name', 'createdAt'],
                    exclude: ['passwd', 'typeCode', 'deviceCode', 'provision', 'token','updatedAt']
                },
                include : [
                    {
                        model: System,
                        as: 'type',
                        attributes: [['value1', 'name']]
                    },
                    {
                        model: System,
                        as: 'device',
                        attributes: [['value1', 'name']],                                                
                    },
                ],
                where: { id : id },
            })

            const data = someone.get({ plain: true });
            data.type = data.type.name;
            data.device = data.device.name;

            delete data.type.name;
            delete data.device.name;

            res.send(formatter.apiResponse({
                msg: '유저 정보는 다음과같습니다.',
                code: response.CODE_SERVICE_PROCESS_1,
                data: data
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
}

