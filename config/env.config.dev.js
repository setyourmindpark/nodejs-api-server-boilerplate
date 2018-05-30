module.exports = {
    base: {
        port: '4000',
        logger: '',
        db: '',
        auth: '',
    },
    setting: {
        upload: {
            local: {
                mainDir: '',
            },
            s3: {
                accessKeyId: '',
                secretAccessKey: '',
                bucket: '',
            }
        },
        auth: {
            jwt: {
                access: {
                    algorithm: '',
                    param: '',
                    secret: '',
                    expire: '',
                },
                refresh: {
                    algorithm: '',
                    param: '',
                    secret: '',
                    expire: '',
                }
            },
            // other auth will be here ..
        },
        db: {
            mysql: {
                host: '',
                port: '',
                user: '',
                database: '',
                password: '',
                connectionLimit: '',
                connectionLeast: '',
            },
            // other db will be here ..
        },
        sender: {
            mail: {
                service: '',
                user: '',
                passwd: '',
                from: '',
            },
            android: {
                serverKey: '',
            },
            ios: {

            }
        },
        logger: {
            local: {
                level: '',
                fileName: '',
                filePath: '',
            },
            fluentd: {
                level: '',
                host: '',
                port: '',
                timeout: '',
                tag: '',
            }
            // other logger option will be here ..
        }
    }
}
