//local system upload 로직과 s3 업로드 로직 이곳에서 구현할것 ...

exports.upload = upload;

const sharp = require('sharp');
const local = require('./local');
const s3 = require('./s3');

async function upload(req, inspectedObj, toValidateFile) {
    try {
        const { inspectedFiles, inspectedFields } = inspectedObj;  
        req.files = {};

        for (let key of Object.keys(inspectedFiles)) {

            const { buffer, fileName } = inspectedFiles[key];            
            const { target, subDir, thumbnail, bucket } = toValidateFile[key]['upload'];

            if (target === 'local') {                                             
                const { originalFileName, ext, renamedFileNameWithExt, rename, uploadFullPath, mainDirPath, subDirPath } = await local.fileUpload(fileName, buffer, subDir);                
                req.files[key] = {                  // file과 thumbnail 업로드 공통 정보
                    originalFileName: originalFileName,
                    ext: ext,
                    mainDirPath: mainDirPath
                };
                req.files[key].file = {             // file과 업로드 정보
                    subDirPath: subDirPath,
                    rename: rename,
                    renamedFileNameWithExt: renamedFileNameWithExt,
                    uploadFullPath: uploadFullPath,
                }

                if (thumbnail) {                    // thumbnail 업로드 정보
                    const { subDir, width, height } = thumbnail;
                    const resizedBuffer = await resizeBuffer(buffer, width, height);
                    const { renamedFileNameWithExt, rename, uploadFullPath } = await local.fileUpload(fileName, resizedBuffer, subDir);
                    req.files[key].thumbnail = {                        
                        subDirPath: subDirPath,
                        rename: rename,
                        renamedFileNameWithExt: renamedFileNameWithExt,
                        uploadFullPath: uploadFullPath,
                    }
                    delete resizedBuffer;
                }

            } else if (target === 's3') {
                const { ETag, Location, Bucket, Key  } = await s3.fileUpload(fileName, buffer, bucket);
                req.files[key] = {};
                req.files[key].file = {
                    ETag: ETag,
                    Location: Location,                    
                    Key: Key,
                    Bucket: Bucket,                    
                };
                if (thumbnail) {
                    const { bucket, width, height } = thumbnail;
                    const resizedBuffer = await resizeBuffer(buffer, width, height);
                    const { ETag, Location, Bucket, Key } = await s3.fileUpload(fileName, resizedBuffer, bucket);
                    req.files[key].thumbnail = {
                        ETag: ETag,
                        Location: Location,
                        Key: Key,
                        Bucket: Bucket,
                    }
                    delete resizedBuffer;
                }                
            }

            delete buffer;
        }

        req.fields = {};
        for (let key of Object.keys(inspectedFields)) {            
            const paramVal = inspectedFields[key];
            req.fields[key] = paramVal;
        }

    } catch (err) {
        delete inspectedFiles;          // inspected 시 buffer가 저장되어있으므로 error 시 모두 삭제
        throw err;
    }
}

async function resizeBuffer(buffer, width, height) {
    const resizedBuffer = await sharp(buffer)
                                    .resize(width, height)
                                    .toBuffer();
    return resizedBuffer;
}
