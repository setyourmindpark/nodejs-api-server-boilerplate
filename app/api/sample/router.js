const { jwtAccessModule, jwtRefreshModule } = reqlib('/app/common/modules');
const assistant = reqlib('/base/assistant')
const router = require('express').Router();
const sampleCtrl = require('./controller');

//restful spec의 get 방식 . params
router.get(
    '/select1/:param1',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            param1: { v_type: 'onlyChar' }
        }
    }),
    assistant.unifyAllProps(),            //all과 같음. 예시임
    sampleCtrl.select1
);

router.get(
    '/select2/:param1/:param2',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            param1: { v_type: 'onlyChar' },
            param2: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.select2
);

//get 방식의 고전 querystring 방식 지원하기위해 예제를 작성함. query, post 의 body validate format과 같음
router.get(
    '/select3',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        query: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' },
            param4: { require: true, v_type: 'any', extra: 'checkEmailRules' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.select3
);

router.post(
    '/insert',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        body: {
            param1: { require: true, v_type: 'any' },
            param2: { require: true, v_type: 'onlyNum' },
            param3: { require: true, v_type: 'onlyChar' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.insert
);

router.put(
    '/update/:where',
    jwtAccessModule.isAuthenticated(),
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
    sampleCtrl.update
);

router.delete(
    '/remove/:where',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.remove
);

router.get(
    '/getPI/:where/:pageNo',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.getPI
);

router.get(
    '/getPR/:where/:pageNo',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.getPR
);

router.get(
    '/getPIWithPR/:where/:pageNo',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        params: {
            where: { v_type: 'any' },
            pageNo: { v_type: 'onlyNum' }
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.getPIWithPR
);

router.post(
    '/transaction',
    jwtAccessModule.isAuthenticated(),
    assistant.unifyAllProps(),
    sampleCtrl.transaction
);

router.post(
    '/checkEmail',
    jwtAccessModule.isAuthenticated(),
    assistant.validate({
        body: {
            email: { require: true, v_type: 'any', extra: 'checkEmailRules' },
        }
    }),
    assistant.unifyAllProps(),
    sampleCtrl.checkEmail
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
    jwtAccessModule.isAuthenticated(),
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
    sampleCtrl.upload
);

//s3 업로드 예제
router.post(
    '/s3Upload',
    jwtAccessModule.isAuthenticated(),
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
    sampleCtrl.upload
);

module.exports = router;
