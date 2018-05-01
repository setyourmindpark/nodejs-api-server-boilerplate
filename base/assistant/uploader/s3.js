
exports.fileUpload = fileUpload;

const AWS = require('aws-sdk');
const path = require('path');
const file = reqlib('/base/common/file');
const uuidV4 = require('uuid/v4');              //http://hyeonjae.github.io/uuid/2015/03/17/uuid.html
const fileType = require('file-type');
const config = reqlib('/config');
const { accessKeyId, secretAccessKey, bucket } = config.setting.upload.s3;

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'ap-northeast-2'                    // 아시아 태평양(서울)
});

async function fileUpload(fileName, buffer, subDir){    
    let fullPath = undefined;
    if (subDir === '/'){
        fullPath = bucket;
    }else{
        fullPath = path.join(bucket, subDir);
    }

    const params = {
        Bucket: fullPath,
        Key: file.uniqueName(),
        ACL: 'public-read',                     // upload한 파일을 publick하게 read 할수있도록. 옵션적어주지않으면 url로 접근할수없음 .
        ContentType: fileType(buffer).mime,
        Body: buffer
    };
    
    const { ETag, Location, Key, Bucket} = await s3.upload(params).promise();
    return {
        ETag: ETag,        
        Location: Location,                     // fullsize url ( public url 전체정보 ) ex) https://jaehunpark.com/file/encryptstring
        Key: Key,                               // dns( 도메인 )을 제외한 sub url ex) file/encryptstring
        Bucket: Bucket                          // bucket
    }

}
