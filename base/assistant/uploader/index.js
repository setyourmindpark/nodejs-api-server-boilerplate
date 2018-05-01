//local system upload 로직과 s3 업로드 로직 이곳에서 구현할것 ...

exports.upload = upload;

const sharp = require('sharp');
const replaceall = require('replaceall');
const moment = require('moment');
const local = require('./local');
const s3 = require('./s3');

async function upload(req, inspectedObj, toValidateFile) {
    try {
        const { inspectedFiles, inspectedFields } = inspectedObj;  
        req.files = {};

        for (let key of Object.keys(inspectedFiles)) {

            const { buffer, fileName } = inspectedFiles[key];            
            const { target, subDir, thumbnail } = toValidateFile[key]['upload'];
            
            

            if (target === 'local') {                                             
                const renamedSubDir = renameSubDir(subDir);
                const { renamedFileNameWithExt, rename, uploadFullPath, mainPath, subPath } = await local.fileUpload(fileName, buffer, renamedSubDir);                
                req.files[key] = {                  // file과 thumbnail 업로드 공통 정보
                    target: 'local',
                    fileName: fileName,
                    mainPath: mainPath
                };
                req.files[key].file = {             // file과 업로드 정보
                    subPath: subPath,
                    rename: rename,
                    renamedFileNameWithExt: renamedFileNameWithExt,
                    uploadFullPath: uploadFullPath,
                }

                if (thumbnail) {                    // thumbnail 업로드 정보
                    const { subDir, width, height } = thumbnail;
                    const renamedSubDir = renameSubDir(subDir);
                    const resizedBuffer = await resizeBuffer(buffer, width, height);
                    const { renamedFileNameWithExt, rename, uploadFullPath, subPath } = await local.fileUpload(fileName, resizedBuffer, renamedSubDir);
                    req.files[key].thumbnail = {
                        subPath: subPath,
                        rename: rename,
                        renamedFileNameWithExt: renamedFileNameWithExt,
                        uploadFullPath: uploadFullPath,
                    }
                    delete resizedBuffer;
                }



            } else if (target === 's3') {
                const renamedSubDir = renameSubDir(subDir);
                const { ETag, Location, Bucket, Key } = await s3.fileUpload(fileName, buffer, renamedSubDir);
                req.files[key] = { 
                    target: 's3',
                    fileName : fileName
                };
                req.files[key].file = {
                    ETag: ETag,
                    Location: Location,                    
                    Key: Key,
                    Bucket: Bucket,                    
                };
                if (thumbnail) {
                    const { subDir, width, height } = thumbnail;
                    const renamedSubDir = renameSubDir(subDir);
                    const resizedBuffer = await resizeBuffer(buffer, width, height);
                    const { ETag, Location, Bucket, Key } = await s3.fileUpload(fileName, resizedBuffer, renamedSubDir);
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

function renameSubDir(subDir){
    if(!subDir) return '/'

    if (subDir) {
        subDir = subDir.charAt(0) === '/' ? subDir : '/' + subDir;
        if (subDir.search('[today]') !== -1) {
            subDir = replaceall('[today]', moment().format('YYYYMMDD'), subDir);
        }
    } 
    return subDir;
}

async function resizeBuffer(buffer, width, height) {
    const resizedBuffer = await sharp(buffer)
                                    .resize(width, height)
                                    .toBuffer();
    return resizedBuffer;
}
