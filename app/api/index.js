const mode = config.mode;

module.exports = {
    commonRoute : '/api',
    routers : [        
        {
            toRoute: '/sample',
            folder: '/sample',
            router: '/router.js',
            activate: mode === 'dev' ? true : false
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