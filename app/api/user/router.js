const { assistant, jwtAccess, jwtRefresh } = reqlib('/app/common/modules');
const delegate = reqlib('/app/common/delegate');
const router = require('express').Router();
const userController = require('./controller');

// RESTFUL SPEC을 지키려합니다.
// http://meetup.toast.com/posts/92
// https://spoqa.github.io/2012/02/27/rest-introduction.html
// nested function 으로 middlewares로 구성한이유는, 개발시 옵션에따른 분기처리를 할수있도록 .... 그런상황이 생기지않을까 ? .. 

const regExpEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

router.get(
    '/validity/email/:email',
    assistant.validate({
        params: {
            email: { v_type: regExpEmail }
        }
    }),
    assistant.unifyAllProps(),
    userController.validityEmail()
);

router.post(
    '/new',
    assistant.validate({
        body: {
            name: { require: true, v_type: 'onlyChar' },
            email: { require: true, v_type: regExpEmail },
            passwd: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userController.new()
);

router.post(
    '/token/me',
    assistant.validate({
        body: {
            email: { require: true, v_type: regExpEmail },
            passwd: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userController.tokenMe()
);

router.post(
    '/token/new',
    jwtRefresh.isAuthenticated(),
    assistant.validate({
        body: {
            accesstoken: { require: true, v_type: 'any' }
        }
    }),
    assistant.unifyAllProps(),
    userController.tokenNew()
);

router.get(
    '/me',
    jwtAccess.isAuthenticated(),
    assistant.unifyAllProps(),
    userController.me()
);

module.exports = router;