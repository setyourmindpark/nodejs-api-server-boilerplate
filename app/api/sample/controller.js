const { senderMail } = require('@root/app/common/modules');
const response = require('@root/app/common/constant/response');
const formatter = require('@root/app/common/formatter');
const Promise = require('bluebird');

exports.path = () => {
    return (req, res, next) => {
        try {
            const { param1 } = req.prop;
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: {
                    param1: param1,
                    property2: 'value2',
                    property3: 'value3',
                }
            }));            
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }   
}

exports.query = () => {
    return (req, res, next) => {
        try {
            const { param1, param2, param3, param4 } = req.prop;
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: {
                    param1: param1,
                    param2: param2,
                    param3: param3,
                    param4: param4,
                }
            }));            
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
};

exports.post = () => {
    return (req, res, next) => {
        try {
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: {
                    property1: 'value1',
                    property2: 'value2',
                    property3: 'value3'
                }
            }));            
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }   
};

exports.put = () => {
    return (req, res, next) => {
        try {
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: {
                    property1: 'value1',
                    property2: 'value2',
                    property3: 'value3'
                }
            }));             
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
};

exports.delete = () => {
    return (req, res, next) => {
        try {
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: {
                    property1: 'value1',
                    property2: 'value2',
                    property3: 'value3'
                }
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
};

exports.localUpload = () => {
    return async (req, res, next) => {
        try {
            // req.files +
            // req.fields +
            // ...
            // = req.prop(all)
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: req.prop
            }));            
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }
}

exports.s3Upload = () => {
    return async (req, res, next) => {
        try {
            // req.files +
            // req.fields +
            // ...
            // = req.prop(all)
            res.send(formatter.apiResponse({
                code: response.CODE_SERVICE_PROCESS_1,
                data: req.prop
            }));     
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }
}

exports.dispatchMail = () => {
    return async (req, res, next) => {
        try {
            const { subject, to, text } = req.prop;
            // ****************************************************************************************************
            // 다수의 사용자에게 동시다발적 메일발송시 Promise.map 사용
            // const resources = [
            //     {
            //         subject: subject,
            //         to: to,
            //         text: text,
            //         // html: '<b>hello world</b>'
            //         // attachments: []
            //     },                 
            //     // { }..
            // ]
            //const resultArr = await Promise.map(resources, item => senderMail.send(item));            
            // resultArr로 메일전송에 실패한 사용자를 분석 또는 확인. 추가로직
            // ****************************************************************************************************

            let format = formatter.apiResponse({
                msg: '메일을 전송하였습니다.',
                code: response.CODE_SERVICE_PROCESS_1
            })
            const { sended, mail } = await senderMail.send({                
                subject: subject,
                to: to,
                text: text,
                // html: '<b>hello world</b>'
                // attachments: []
            });
            if (!sended){
                format= formatter.apiResponse({
                    msg: '메일을 전송에 실패하였습니다. 수신인을 확인해주세요.',
                    code: response.CODE_SERVICE_PROCESS_2
                })
            }
            res.send(format);
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }
}
