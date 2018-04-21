//local system upload 로직과 s3 업로드 로직 이곳에서 구현할것 ...

exports.uploadFile = uploadFile;

const local = require('./local');
const s3 = require('./s3');

async function uploadFile(req, inspectedObj, toValidateFile) {
    try {
        const { inspectedFiles, inspectedFields } = inspectedObj;        
        req.files = {};
        for (let key of Object.keys(inspectedFiles)) {

            const toUploadObj = toValidateFile[key]['upload'];
            const { target: toUploadTarget, thumbnail: toUploadThumbnailObj } = toUploadObj;
            const inspectedFileObj = inspectedFiles[key];                          

            if (toUploadTarget === 'local') {
                const { isDone, uploadedObj } = await local.processFileUpload(inspectedFileObj, toUploadObj);
                if (isDone) {
                    req.files[key] = uploadedObj;
                }

                if (toUploadThumbnailObj) {
                    const { isDone, uploadedObj } = await local.processThumbNailUpload(inspectedFileObj, toUploadThumbnailObj);
                    if (isDone) {
                        req.files[key] = Object.assign(req.files[key], uploadedObj);
                    }
                }

            } else if (toUploadTarget === 's3') {

                const { isDone, uploadedObj } = await s3.processFileUpload(inspectedFileObj, toUploadObj);
                if (isDone) {
                    req.files[key] = uploadedObj;
                }

                if (toUploadThumbnailObj) {
                    const { isDone, uploadedObj } = await s3.processThumbNailUpload(inspectedFileObj, toUploadThumbnailObj);
                    if (isDone) {
                        req.files[key] = Object.assign(req.files[key], uploadedObj);
                    }
                }

            }

            delete inspectedFileObj;
            delete inspectedFiles[key];

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
