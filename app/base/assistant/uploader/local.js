exports.processFileUpload = processFileUpload;
exports.processThumbNailUpload = processThumbNailUpload;

const conf = reqlib("/app/conf");
const path = require('path');
const mkdirp = require('mkdirp');
const constant = reqlib('/app/base/constant');
const replaceall = require("replaceall");
const sharp = require('sharp');
const file = reqlib('/app/base/assistant/file');
const rootPath = require('app-root-path');
const appRootPath = rootPath.path;
let targetPath = conf.config.upload.local.mainDir;
targetPath = targetPath.charAt(0) === '/' ? targetPath : '/' + targetPath;
targetPath = targetPath.charAt(targetPath.length - 1) === '/' ? targetPath.slice(0, -1) : targetPath;
const mainDirPath = appRootPath + targetPath;

async function processFileUpload(paramObj, toCheckObj) {
    try {
        const { buffer, fileName } = paramObj;
        const { subDir } = toCheckObj;        

        const { isExsist, fullPath, subDirPath } = file.makeDirContext(mainDirPath, subDir);
        if (!isExsist) {
            file.mkdir(fullPath);
        };

        const { isUploaded, uploadedObj } = await fileUpload(fileName, buffer, fullPath);
        if (isUploaded) {
            uploadedObj.target = 'local';
            uploadedObj.mainDirPath = mainDirPath;
            uploadedObj.subFilePath = subDirPath;
            return {
                isDone: true,
                uploadedObj: uploadedObj
            }
        };

    } catch (err) {
        throw err;
    }
}

async function processThumbNailUpload(paramObj, toCheckObj) {
    //업로드가 true 체크
    try {
        const { buffer, fileName } = paramObj;
        const { width, height, subDir }= toCheckObj;        
        const { isExsist, fullPath, subDirPath } = file.makeDirContext(mainDirPath, subDir);

        if (!isExsist) {
            file.mkdir(fullPath)
        }

        const { isUploaded, uploadedObj} = await thumbnailUpload(fileName, width, height, buffer, fullPath);
        if (isUploaded) {
            uploadedObj.subTbnPath = subDirPath;
            return {
                isDone: true,
                uploadedObj: uploadedObj
            }
        }
    } catch (err) {
        throw err;
    }
}

async function fileUpload(originalFilename, buffer, fullPath) {
    return new Promise((resolve, reject) => {
        try {
            const ext = '.' + file.fileExt(originalFilename);
            const rename = file.uniqueName();
            const renamedFileNameWithExt = rename + ext;
            const toUploadFileFullPath = path.join(fullPath, renamedFileNameWithExt);

            sharp(buffer)
                .toFile(toUploadFileFullPath, (err, info) => {
                    if (err) throw err;

                    resolve({
                        isUploaded: true,
                        uploadedObj: {
                            originalFilename: originalFilename,
                            uploadedFileFullPath: toUploadFileFullPath,
                            fileExt: ext,
                            renamedFileNameWithExt: renamedFileNameWithExt,
                            renamedFileName: rename
                        }
                    })
                });
        } catch (err) {
            reject(err);
        }
    })
}

//https://www.npmjs.com/package/sharp     //thumbnail node module description
async function thumbnailUpload(originalFilename, width, height, buffer, fullPath) {
    return new Promise((resolve, reject) => {
        try {
            const ext = '.' + file.fileExt(originalFilename);
            const rename = file.uniqueName();
            const renamedTbnNameWithExt = rename + ext;
            const toUploadTbnFullPath = path.join(fullPath, renamedTbnNameWithExt)

            sharp(buffer)
                .resize(width || 100, height || 100)      //default 100으로 설정함
                .toFile(toUploadTbnFullPath, (err, info) => {
                    if (err) throw err;

                    resolve({
                        isUploaded: true,
                        uploadedObj: {
                            uploadedTbnFullPath: toUploadTbnFullPath,
                            renamedTbnNameWithExt: renamedTbnNameWithExt,
                            renamedTbnName: rename
                        }
                    })
                });
        } catch (err) {
            reject(err);
        }
    })
}
