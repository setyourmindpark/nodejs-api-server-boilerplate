const env = process.env;
//http://blog.saltfactory.net/implements-nodejs-based-https-server/
//http://yakolla.tistory.com/117
//https://www.npmjs.com/package/ursa
//https://de.slideshare.net/ssuser800974/ss-76664853
//https://www.xetown.com/slope/135905

module.exports = {
    base: {
        port: env.BASE_PORT,
        logger: env.BASE_LOGGER,
        db: env.BASE_DB,
        auth: env.BASE_AUTH,
    },
    setting: {
        upload: {
            local: {
                mainDir: env.UPLOAD_LOCAL_MAIN_DIR_PATH,
            },
            s3: {
                accessKeyId: env.S3_ACCESS_KEY_ID,
                secretAccessKey: env.S3_SECRET_ACCESS_KEY,
            }
        },
        auth: {
            jwt: {
                access: {
                    algorithm: env.AUTH_JWT_ACCESS_ALGORITHM,
                    param: env.AUTH_JWT_ACCESS_PARAM,
                    secret: env.AUTH_JWT_ACCESS_SECRET,
                    expire: env.AUTH_JWT_ACCESS_EXPIRE,
                },
                refresh: {
                    algorithm: env.AUTH_JWT_REFRESH_ALGORITHM,
                    param: env.AUTH_JWT_REFRESH_PARAM,
                    secret: env.AUTH_JWT_REFRESH_SECRET,
                    expire: env.AUTH_JWT_REFRESH_EXPIRE,
                }
            },
            // other auth will be here ..
        },
        db: {
            mysql: {
                host: env.DB_MYSQL_HOST,
                port: env.DB_MYSQL_PORT,
                user: env.DB_MYSQL_USER,
                database: env.DB_MYSQL_DATABASE,
                password: env.DB_MYSQL_PASSWORD,
                connectionLimit: env.DB_MYSQL_CONNECTION_LIMIT,
                connectionLeast: env.DB_MYSQL_CONNECTION_LEAST
            },
            // other db will be here ..
        },
        sender: {
            mail: {
                service : env.SENDER_MAIL_SERVICE,
                user: env.SENDER_MAIL_ID,
                passwd: env.SENDER_MAIL_PASSWD,                
                from: env.SENDER_MAIL_FROM,
            },
            android: {

            },
            ios: {
                
            }
        },
        logger: {
            local: {
                level: env.LOGGER_LOCAL_LEVEL,
                fileName: env.LOGGER_LOCAL_FILE_NAME,
                filePath: env.LOGGER_LOCAL_FILE_PATH,
            },
            fluentd: {
                level: env.LOGGER_FLUENTD_LEVEL,
                host: env.LOGGER_FLUENTD_HOST,
                port: env.LOGGER_FLUENTD_PORT,
                timeout: env.LOGGER_FLUENTD_TIMEOUT,
                tag: env.LOGGER_FLUENTD_TAG,
            }
            // other logger option will be here ..
        }
    }


}
