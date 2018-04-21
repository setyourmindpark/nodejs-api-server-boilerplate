const config = reqlib('/config');
const env = config.env;

module.exports = {
    commonRoute : '/api',
    routers : [
        {
            customRoute: '/swagger',
            folder : '/swagger',
            router : '/router.js',
            activate : env === 'dev' ? true : false
        },
        {
            toRoute: '/sample',
            folder: '/sample',
            router: '/router.js',
            activate: true
        },
        {
            toRoute: '/user',
            folder: '/user',
            router: '/router.js',
            activate: true
        },

        // ..

    ]
}