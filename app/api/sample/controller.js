const { queryHelper, formatter } = reqlib('/app/common/modules');
const sampleSql = reqlib('/app/query/queryHelper/sample.sql');
const constant = reqlib('/app/common/constant');
const config = reqlib('/config');

exports.select1 = () => {
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

exports.select2 = () => {
    return (req, res, next) => {
        try {
            const { param1, param2 } = req.prop;
            res.send(formatter.apiResponse({
                code: constant.CODE_SERVICE_PROCESS_1,
                data: {
                    param1: param1,
                    param2: param2,
                    property3: 'value3'
                }
            }));            
        } catch (err) {
            res.status(500).send(formatter.apiErrResponse(err));
        }
    }    
};

exports.select3 = () => {
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

exports.insert = () => {
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

exports.update = () => {
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

exports.remove = () => {
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

// exports.getPI = async (req, res, next) => {
//     try {
//         const { where, pageNo } = req.prop;
//         const { recordCountPerPage, pageSize } = config.setting.pagenation;        
//         const data = {
//             where: where,
//             pageNo: pageNo,
//             recordCountPerPage: recordCountPerPage,   // 없으면 default 10으로 동작
//             pageSize: pageSize                        // 없으면 default 10으로 동작
//         };
//         response.apiResponse(res, {
//             code: constant.CODE_SERVICE_PROCESS_1,
//             pagenationInfo: await queryHelper.executePI({ query: sampleSql.examplePagenationCnt, data: data })
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// }

// exports.getPR = async (req, res, next) => {
//     try {
//         const { where, pageNo } = req.prop;
//         const { recordCountPerPage, pageSize } = config.setting.pagenation;
//         const data = {
//             where: where,
//             pageNo: pageNo,
//             recordCountPerPage: recordCountPerPage,   // 없으면 default 10으로 동작
//             pageSize: pageSize                        // 없으면 default 10으로 동작
//         };
//         response.apiResponse(res, {
//             code: constant.CODE_SERVICE_PROCESS_1,
//             data: await queryHelper.executePR({ query: sampleSql.examplePagenation, data: data })
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// }

// exports.getPIWithPR = async (req, res, next) => {
//     try {
//         const { where, pageNo } = req.prop;
//         const { recordCountPerPage, pageSize } = config.setting.pagenation;
//         const data = {
//             where: where,
//             pageNo: pageNo,
//             recordCountPerPage: recordCountPerPage,   // 없으면 default 10으로 동작
//             pageSize: pageSize                        // 없으면 default 10으로 동작
//         };
//         response.apiResponse(res, {
//             code: constant.CODE_SERVICE_PROCESS_1,
//             pagenationInfo: await queryHelper.executePI({ query: sampleSql.examplePagenationCnt, data: data }),
//             data: await queryHelper.executePR({ query: sampleSql.examplePagenation, data: data })
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// }

// exports.transaction = async (req, res, next) => {
//     try {
//         // id 값을 이미있는 id 값을 주면 rollback 됨 ex) id : 1
//         response.apiResponse(res, {
//             code: constant.CODE_SERVICE_PROCESS_1,
//             data: await queryHelper.transaction(
//                 [
//                     { query: sampleSql.transaction, data: { id: null, col1: 'a', col2: 'b', col3: 'c', col4: 'd', col5: 'e' }, expect: 'single' }
//                     , { query: sampleSql.transaction, data: { id: null, col1: 'a', col2: 'b', col3: 'c', col4: 'd', col5: 'e' }, expect: 'single' }
//                     , { query: sampleSql.transaction, data: { id: null, col1: 'a', col2: 'b', col3: 'c', col4: 'd', col5: 'e' }, expect: 'single' }
//                 ]
//             )
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// };

// exports.checkEmail = async (req, res, next) => {
//     try {
//         //현재 이메일 format validate만 수행함.
//         //이메일 중복여부는 이곳에서 로직처리하면됨 .
//         response.apiResponse(res, {
//             code: constant.CODE_SERVICE_PROCESS_1,
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// };

// exports.upload = async (req, res, next) => {
//     // console.log('#################### req.files ####################');
//     // console.log(JSON.stringify(req.files));
//     // console.log('#################### req.files ####################');
//     // console.log('#################### req.fields ####################');
//     // console.log(JSON.stringify(req.fields));
//     // console.log('#################### req.fields ####################');
//     //
//     // //http://jsonviewer.stack.hu/   //online json viewer
//     //
//     // console.log('#################### 최종 ####################');
//     // console.log(JSON.stringify(req.prop));
//     // console.log('#################### 최종 ####################');
//     try {
//         response.apiResponse(res, {
//             data: req.prop
//         });
//     } catch (err) {
//         response.apiErrResponse(res, err);
//     }
// }
