const env = process.env;
//http://blog.saltfactory.net/implements-nodejs-based-https-server/
//http://yakolla.tistory.com/117
//https://www.npmjs.com/package/ursa
//https://de.slideshare.net/ssuser800974/ss-76664853
//https://www.xetown.com/slope/135905

module.exports = {
    context: {
        port: env.CONTEXT_PORT,
        db: env.CONTEXT_DB,
        auth: env.CONTEXT_AUTH,
        logger: env.CONTEXT_LOGGER,
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
                logging: env.DB_MYSQL_LOGGING,
            },
            // other db will be here ..
        },
        pagenation: {
            recordCountPerPage: env.PAGENATION_RECORD_COUNT_PER_PAGE,
            pageSize: env.PAGENATION_PAGE_SIZE,
        },
        mailSender: {
            mailId: env.MAIL_SENDER_MAIL_ID,
            passwd: env.MAIL_SENDER_MAIL_PASSWD,
            smtpDomain: env.MAIL_SENDER_SMTP_DOMAIN,
            from: env.MAIL_SENDER_FROM,
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
