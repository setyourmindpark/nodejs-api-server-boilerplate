## NODEJS-API-SERVER-BOILERPLATE
NODEJS-API-SERVER-BOILERPLATE를 목표로 개발중이다.   
환경변수 설정만으로 동작하도록 구성중이며 제공되는 기능은 다음과같다.    
assistant( parameter validator, file uploader [ local, s3 ] )  
authorizer( jsonwebtoken )  
sequelize  
logger( local, fluentd )  
그리고 개인적으로만든 queryHelper가 있습니다.( queryHelper는 모듈에는 포함시켰지만 sequelize 사용하는게.. )  

## 환경변수
``` bash
BASE_PORT=( base로 사용할 port ex. 4000 ) 
BASE_LOGGER= ( base로 사용할 autorizer ex. local ) 
BASE_DB= ( base로 사용할 database type ex. mysql [ 현재는 mysql만 존재.. ] ) 
BASE_AUTH= ( base로 사용할 autorizer ex. jwt [ 현재는 jwt만 존재.. ] ) 

BASE_LINK_DB_SOMETHING=..

UPLOAD_LOCAL_MAIN_DIR_PATH= ( 파일업로드 처리 경로 ex. /app/public/upload )

S3_ACCESS_KEY_ID= ( aws에서 발급반은 access key )
S3_SECRET_ACCESS_KEY= ( aws에서 발급반은 secret access key )
S3_BUCKET= ( s3 버킷명 )

AUTH_JWT_ACCESS_ALGORITHM= ( 암호화 알고리즘 ex. HS256 )
AUTH_JWT_ACCESS_PARAM= ( header 명 ex. header1 )
AUTH_JWT_ACCESS_SECRET= ( ex. secret1 )
AUTH_JWT_ACCESS_EXPIRE= ( 토큰 발행후 만료시간(초) ex. 600 )

AUTH_JWT_REFRESH_ALGORITHM= ( 암호화 알고리즘 ex. HS256 )
AUTH_JWT_REFRESH_PARAM= ( header 명 ex. header2 )
AUTH_JWT_REFRESH_SECRET= ( ex. secret2 )
AUTH_JWT_REFRESH_EXPIRE= ( 토큰 발행후 만료시간(초) ex. 6000 )

DB_MYSQL_HOST= ( ex. localhost )
DB_MYSQL_PORT= ( ex. 3306 )
DB_MYSQL_USER= ( database 계정 )
DB_MYSQL_DATABASE= ( ex. database )
DB_MYSQL_PASSWORD= ( database 계정 비밀번호 )
DB_MYSQL_CONNECTION_LIMIT= ( ex. 200 )
DB_MYSQL_CONNECTION_LEAST= ( ex. 10 )

SENDER_MAIL_SERVICE= ( ex. gmail )
SENDER_MAIL_ID= ( ex. user@gmail.com )
SENDER_MAIL_PASSWD= ( ex. 계정 비밀번호 )
SENDER_MAIL_FROM=mail_from ( 발신인 ex. jaehunpark<setyourmindpark@gmail.com> )

SENDER_ANDROID_SERVER_KEY= ( fcm에서 발급받은 server key )

LOGGER_LOCAL_LEVEL= ( local log level ex. debug )
LOGGER_LOCAL_FILE_PATH= ( local log file path ex. /some/where )
LOGGER_LOCAL_FILE_NAME= ( local log file name ex. /app.log )

LOGGER_FLUENTD_LEVEL=fluentd_log_level ( local log level ex. debug )
LOGGER_FLUENTD_HOST= ( ex. localhost )
LOGGER_FLUENTD_PORT= ( ex. 24224 )
LOGGER_FLUENTD_TIMEOUT= ( ex. 3 )
LOGGER_FLUENTD_TAG= ( ex. app )

```

## asisstant
기본적으로 설정 방법은 다음과같다.  
미들웨어기반으로 동작하기에 express 미들웨어로 작성한다.  
### basic
``` javascript
const regExpEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
router.get(
    '/path/:param1',
    assistant.validate({
        params: {                                               // => params는 default require: true ( url path로 넘어오기에 .. )
            param1: { v_type: 'any' },                          // => param1 파라미터는 값은 아무값이나 상관없음
            param2: { v_type: 'onlyNum' },                      // => param1 파라미터는 값은 오직 숫자만 가능 ex. '12345' O, 'some1' X
            param3: { v_type: 'onlyChar' },                     // => param1 파라미터는 값은 오직 문자만 가능 ex. 'something' O, 'some1' X
            param4: { v_type: regExpEmail }                     // => param1 파라미터는 값은 오직 정규식( regExpEmail ) 형태만 가능
        },
        query: {                                                // => querystring
            query1: { require: true, v_type:'any' }             // query1 파라미터는 필수이며 값은 아무값이나 상관없음
            // ...
        },
        body: {
            body1: { require: true, v_type:'any' }
        }
    }, message.customMessage()),                                // => custom하게 에러메시지를 표시하고싶다면 callback function을 작성 
    assistant.unifyAllProps(),                                  // => request로 binding된 params, query, body, header를 prop 로 모두 unify
    sampleController.path()                                     // => 서비스로직 controller 호출
);

```
assistant.validator의 2번째인자값의 callback function은 명시하지않으면 default로 /base/common/constant 기반으로 동작한다.  
custom하게 error response handling시 위와같이 장성한다. ( /app/common/message 참고 )  

### local file upload
``` javascript
// [ 파일용량 ]
// b for bytes
// kb for kilobytes
// mb for megabytes
// gb for gigabytes
// tb for terabytes
// 'any' max 용량체크안함 .

// [ 하위디렉토리 ] 
// [today] 는 현재날짜로 폴더를 생성하게됨. 
router.post(
    '/localUpload',
    assistant.validate({
        multipart: {
            files: {
                fileFeild1: { require: true, allowExt: ['jpg', 'bmp'], uptoSize: '20mb', upload: { target: 'local', subDir: '/[today]/files', thumbnail: { width: 100, height: 200, subDir: '/[today]/thumbnails' } } },
                fileFeild2: { require: false, allowExt: 'any', uptoSize: 'any', upload: { target: 'local', subDir: '/[today]/files' } }
            },
            fields: {
                bodyFeild1: { require: true, v_type: regExpEmail },
                bodyFeild2: { require: false, v_type: 'any' }
            }
        }
    }, message.customMessage() ),
    assistant.unifyAllProps(),
    sampleController.localUpload()
);
```
### s3 file upload
``` javascript
// s3에 bucket은 반드시 생성하고 사용할것.
// 버킷/폴더/폴더/....
// 폴더생성은 자동으로 생성됨 .
router.post(
    '/s3Upload',
    assistant.validate({
        multipart: {
            files: {
                fileFeild1: { require: true, allowExt: 'any', uptoSize: '20mb', upload: { target: 's3', subDir: '/[today]/files', thumbnail: { width: 300, height: 300, subDir: '/[today]/thumbnails' } } },
                fileFeild2: { require: true, allowExt: 'any', uptoSize: '20mb', upload: { target: 's3', subDir: '/[today]/files' } },
            },
            fields: {
                bodyFeild1: { require: false, v_type: regExpEmail },
                bodyFeild2: { require: false, v_type: 'any' }
            }
        }
    }, message.customMessage()),
    assistant.unifyAllProps(),
    sampleController.s3Upload()
);
```

### sequelize
/app/query/sequelize/design/models에 sequelize model을 정의하고 /app/query/sequelize/design/index.js에 bind와 associations 정의한다.  


