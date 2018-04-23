const { jwtAccessModule, jwtRefreshModule } = reqlib('/app/common/modules');
const assistant = reqlib('/base/assistant')
const router = require('express').Router();
const userCtrl = require('./controller');

// RESTFUL SPEC을 지키려합니다
// http://meetup.toast.com/posts/92
// https://spoqa.github.io/2012/02/27/rest-introduction.html

router.get(
    '/validity/email/:email',
    assistant.validate({
        params: {
            email: { v_type: 'any', extra: 'checkEmailRules' }
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.validityEmail
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
    '/token/me',
    assistant.validate({
        body: {            
            email: { require: true, v_type: 'any', extra: 'checkEmailRules' },
            passwd: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.tokenMe
);

router.post(
    '/token/new',
    jwtRefreshModule.isAuthenticated(),
    assistant.validate({        
        body: {
            accesstoken: { require: true, v_type: 'any'}            
        }
    }),
    assistant.unifyAllProps(),
    userCtrl.tokenNew
);

router.get(
    '/me',
    jwtAccessModule.isAuthenticated(),
    assistant.unifyAllProps(),
    userCtrl.me
);

module.exports = router;
