module.exports = {
    commonRoute : '/api',
    routers : [
        {
            customRoute: '/swagger',
            folder : '/swagger',
            router : '/router.js',
            activate : true
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