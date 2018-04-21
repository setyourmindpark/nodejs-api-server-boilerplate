exports.processFileUpload = processFileUpload;
exports.processThumbNailUpload = processThumbNailUpload;

const config = reqlib('/config');
const path = require('path');
const mkdirp = require('mkdirp');
const constant = reqlib('/base/common/constant');
const replaceall = require("replaceall");
const sharp = require('sharp');
const file = reqlib('/base/common/file');
const moment = require('moment');
const rootPath = require('app-root-path');
const appRootPath = rootPath.path;
let targetPath = config.setting.upload.local.mainDir;
targetPath = targetPath.charAt(0) === '/' ? targetPath : '/' + targetPath;
targetPath = targetPath.charAt(targetPath.length - 1) === '/' ? targetPath.slice(0, -1) : targetPath;
const mainDirPath = appRootPath + targetPath;


//subdir 존재 검사
function makeDirContext(mainDirPath, subPath) {
    let subDirPath = undefined;
    let fullPath = mainDirPath;
    if (subPath === 'default') {      //default는 현재 날짜로 폴더생성 .
        subDirPath = '/' + moment().format('YYYYMMDD');
        fullPath += subDirPath;
    } else {
        subDirPath = subPath.charAt(0) === '/' ? subPath : '/' + subPath;
        fullPath += subDirPath;
    }

    if (!file.isExsistDir(fullPath)) {
        return {
            isExsist: false,
            mainDirPath: mainDirPath,
            subDirPath: subDirPath,
            fullPath: fullPath
        }
    }
    return {
        isExsist: true,
        mainDirPath: mainDirPath,
        subDirPath: subDirPath,
        fullPath: fullPath
    }
};

async function processFileUpload(paramObj, toCheckObj) {
    try {
        const { buffer, fileName } = paramObj;
        const { subDir } = toCheckObj;        

        const { isExsist, fullPath, subDirPath } = makeDirContext(mainDirPath, subDir);
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
        const { isExsist, fullPath, subDirPath } = makeDirContext(mainDirPath, subDir);

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


