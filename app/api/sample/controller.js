const { queryHelper, senderMail } = reqlib('/app/common/modules');
const constant = reqlib('/app/common/constant');
const formatter = reqlib('/app/common/formatter');
const config = reqlib('/config');

exports.path = () => {
    return (req, res, next) => {
        try {
            const { param1 } = req.prop;
            res.send(formatter.apiResponse({
                code: constant.CODE_SERVICE_PROCESS_1,
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
                code: constant.CODE_SERVICE_PROCESS_1,
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
                code: constant.CODE_SERVICE_PROCESS_1,
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
                code: constant.CODE_SERVICE_PROCESS_1,
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
                code: constant.CODE_SERVICE_PROCESS_1,
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
                code: constant.CODE_SERVICE_PROCESS_1,
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
            await senderMail.send({                
                subject: subject,
                to: to,
                text: text,
                // html: '<b>hello world</b>'
                // attachments: []
            })
            res.send(formatter.apiResponse({
                msg: '메일을 전송하였습니다.',
                code: constant.CODE_SERVICE_PROCESS_1
            }));
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }
}
