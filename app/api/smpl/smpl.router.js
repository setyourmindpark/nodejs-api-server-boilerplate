const auth = reqlib('/app/base/auth')
const assistant = reqlib('/app/base/assistant')
const router = require('express').Router();
const smplCtrl = require('./smpl.ctrl');

//restful spec의 get 방식 . params
router.get(
    '/select1/:param1',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            param1: { v_type: 'onlyChar' }
        }
    }),
    assistant.unifyAllProps(),            //all과 같음. 예시임
    smplCtrl.select1
);

router.get(
    '/select2/:param1/:param2',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            param1: { v_type: 'onlyChar' },
            param2: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.select2
);

//get 방식의 고전 querystring 방식 지원하기위해 예제를 작성함. query, post 의 body validate format과 같음
router.get(
    '/select3',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        query: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' },
            param4: { require: true, v_type: 'any', extra: 'checkEmailRules' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.select3
);

router.post(
    '/insert',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        body: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.insert
);

router.put(
    '/update/:where',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' }
        },
        body: {
            param1: { require: true, v_type: 'onlyChar' },
            param2: { require: true, v_type: 'any' },
            param3: { require: false, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.update
);

router.delete(
    '/remove/:where',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.remove
);

router.get(
    '/getPI/:where/:pageNo',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.getPI
);

router.get(
    '/getPR/:where/:pageNo',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.getPR
);

router.get(
    '/getPIWithPR/:where/:pageNo',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.getPIWithPR
);

router.post(
    '/transaction',
    auth.accessTokenIsAuthenticated(),
    assistant.unifyAllProps(),
    smplCtrl.transaction
);

router.post(
    '/sendMail',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        body: {
            to: { require: true, v_type: 'any' },
            subject: { require: true, v_type: 'any' },
            text: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.sendMail
);

router.post(
    '/checkEmail',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        body: {
            email: { require: true, v_type: 'any', extra: 'checkEmailRules' },
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.checkEmail
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
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        multipart: {
            files: {
                fileFeild1: { require: true, allowExt: 'any', uptoSize: '20mb', upload: { target: 'local', subDir: '/jaehunpark2', thumbnail: { width: 100, height: 200, subDir: '/ccc' } } },
                fileFeild2: { require: false, allowExt: 'any', uptoSize: 'any', upload: { target: 'local', subDir: 'default' } }
                //fileFeild2 : { require : true, allowExt : 'any', uptoSize : '20mb', upload : { target : 's3', bucket : 'jaehunpark' , thumbnail : { width:200, height : 200, bucket : 'jaehunpark'} } }
            },
            fields: {
                bodyFeild1: { require: true, v_type: 'any', extra: 'checkEmailRules' },
                bodyFeild2: { require: false, v_type: 'any' }
            }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.upload
);

//s3 업로드 예제
router.post(
    '/s3Upload',
    auth.accessTokenIsAuthenticated(),
    assistant.validate({
        multipart: {
            files: {
                fileFeild1: { require: true, allowExt: 'any', uptoSize: '20mb', upload: { target: 's3', bucket: 'jaehunpark', thumbnail: { width: 200, height: 200, bucket: 'jaehunpark' } } },
            },
            fields: {
                bodyFeild1: { require: true, v_type: 'any', extra: 'checkEmailRules' },
                bodyFeild2: { require: false, v_type: 'any' }
            }
        }
    }),
    assistant.unifyAllProps(),
    smplCtrl.upload
);

module.exports = router;
