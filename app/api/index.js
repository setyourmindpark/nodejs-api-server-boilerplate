module.exports = {
    commonRoute : '/api',
    routers : [        
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