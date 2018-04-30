const { assistant } = reqlib('/app/common/modules');
const handler = reqlib('/app/common/handler');
const router = require('express').Router();
const sampleController = require('./controller');
const regExpEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

router.get(
    '/path/:param1',
    assistant.validate({
        params: {
            param1: { v_type: 'onlyChar' }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.path()
);

//get 방식의 고전 querystring 방식 지원하기위해 예제를 작성함. query, post 의 body validate format과 같음
router.get(
    '/query',
    assistant.validate({
        query: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' },
            param4: { require: true, v_type: regExpEmail }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.query()
);

router.post(
    '/post',
    assistant.validate({
        body: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.post()
);

router.put(
    '/put/:where',
    assistant.validate({
        params: {
            where: { v_type: 'onlyNum' }
        },
        body: {
            param1: { require: true, v_type: 'onlyChar' },
            param2: { require: true, v_type: 'any' },
            param3: { require: false, v_type: 'any' }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.put()
);

router.delete(
    '/delete/:where',
    assistant.validate({
        params: {
            where: { v_type: 'onlyNum' }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.delete()
);

//https://www.npmjs.com/package/bytes
// support  b for bytes
//          kb for kilobytes
//          mb for megabytes
//          gb for gigabytes
//          tb for terabytes
//          'any' max 용량체크안함 .
// s3 ex) fileFeild1 : { require : true, allowExt : 'any', uptoSize : '20mb', upload : { target : 's3', bucket : 'jaehunpark' , thumbnail : { width:200, height : 200, bucket : 'jaehunpark'} } },
router.post(
    '/localUpload',
    assistant.validate({
        multipart: {
            files: {
                fileFeild1: { require: true, allowExt: ['jpg','bmp'], uptoSize: '20mb', upload: { target: 'local', subDir: '/jaehunpark2', thumbnail: { width: 100, height: 200, subDir: '/ccc' } } },
                fileFeild2: { require: false, allowExt: 'any', uptoSize: 'any', upload: { target: 'local', subDir: 'default' } }
                //fileFeild2 : { require : true, allowExt : 'any', uptoSize : '20mb', upload : { target : 's3', bucket : 'jaehunpark' , thumbnail : { width:200, height : 200, bucket : 'jaehunpark'} } }
            },
            fields: {
                bodyFeild1: { require: true, v_type: regExpEmail },
                bodyFeild2: { require: false, v_type: 'any' }
            }
        }
    }, true ),
    handler.handleCustomValidateResponse(),
    assistant.unifyAllProps(),
    sampleController.localUpload()
);

// //s3 업로드 예제
// router.post(
//     '/s3Upload',
//     assistant.validate({
//         multipart: {
//             files: {
//                 fileFeild1: { require: true, allowExt: 'any', uptoSize: '20mb', upload: { target: 's3', bucket: 'jaehunpark', thumbnail: { width: 200, height: 200, bucket: 'jaehunpark' } } },
//             },
//             fields: {
//                 bodyFeild1: { require: true, v_type: 'any', extra: 'checkEmailRules' },
//                 bodyFeild2: { require: false, v_type: 'any' }
//             }
//         }
//     }),
//     assistant.unifyAllProps(),
//     sampleController.s3Upload()
// );

router.post(
    '/dispatch/mail',
    assistant.unifyAllProps(),
    sampleController.dispatchMail()
);

module.exports = router;
