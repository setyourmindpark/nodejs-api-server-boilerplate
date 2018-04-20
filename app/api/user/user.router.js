const auth = reqlib('/app/base/auth');
const assistant = reqlib('/app/base/assistant')
const router = require('express').Router();
const userCtrl = require('./user.ctrl');

// RESTFUL SPEC을 지키려합니다
// http://meetup.toast.com/posts/92
// https://spoqa.github.io/2012/02/27/rest-introduction.html

router.get(
    '/check/email/:email',
    assistant.validate({
        params: {
            email: { v_type: 'any', extra: 'checkEmailRules' }
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.checkEmail
);

router.post(
    '/new',
    assistant.validate({
        body: {
            name: { require: true, v_type: 'onlyChar'},
            email: { require : true, v_type: 'any', extra: 'checkEmailRules' },
            passwd: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.new
);

router.post(
    '/login',
    assistant.validate({
        body: {            
            email: { require: true, v_type: 'any', extra: 'checkEmailRules' },
            passwd: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.login
);

router.post(
    '/new/token',
    auth.refreshTokenIsAuthenticated(),
    assistant.validate({
        body: {
            accesstoken: { require: true, v_type: 'any'}            
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.newToken
);

router.get(
    '/info',
    auth.accessTokenIsAuthenticated(),
    assistant.unifyAllProps(),
    userCtrl.info
);

module.exports = router;
