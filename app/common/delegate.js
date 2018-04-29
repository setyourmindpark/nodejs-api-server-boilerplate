
// const formatter = require('./formatter');

// exports.handleWarningJwtMiddleWareDelegate = handleWarningJwtMiddleWareDelegate;
// exports.handleWarningAssistantMiddleWareDelegate = handleWarningAssistantMiddleWareDelegate;

// function handleWarningJwtMiddleWareDelegate(){
//     return ( middleware, warning ) => {
//         const { req, res, next } = middleware;
//         const { code, msg } = warning;
//         res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
//     }
// }

// function handleWarningAssistantMiddleWareDelegate() {
//     return (middleware, warning) => {
//         const { req, res, next } = middleware;
//         const { code, msg } = warning;       
//         res.send(formatter.apiResponse({ resultCode: code, msg: msg }))
//     }
// }
