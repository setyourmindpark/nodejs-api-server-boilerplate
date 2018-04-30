exports.fileUpload = fileUpload;

const config = reqlib('/config');
const path = require('path');
const sharp = require('sharp');
const file = reqlib('/base/common/file');
const moment = require('moment');
const rootPath = require('app-root-path');
const appRootPath = rootPath.path;
let targetPath = config.setting.upload.local.mainDir;
targetPath = targetPath.charAt(0) === '/' ? targetPath : '/' + targetPath;
targetPath = targetPath.charAt(targetPath.length - 1) === '/' ? targetPath.slice(0, -1) : targetPath;
const mainDir = appRootPath + targetPath;

function makeDirContext(mainDirPath, subPath) {
    let subDirPath = undefined;
    let fullPath = mainDirPath;
    if (subPath === 'default') {            //default는 현재 날짜로 폴더생성 .
        subDirPath = '/' + moment().format('YYYYMMDD');
        fullPath += subDirPath;
    } else {
        subDirPath = subPath.charAt(0) === '/' ? subPath : '/' + subPath;
        fullPath += subDirPath;
    }

    if (!file.isExsistDir(fullPath)) {
        return {
            isExsist: false,
            fullPath: fullPath
        }
    }
    return {
        isExsist: true,        
        fullPath: fullPath
    }
};

async function fileUpload(fileName, buffer, subDir){
    const { isExsist, fullPath, mainDirPath, subDirPath } = makeDirContext(mainDir, subDir);    
    if (!isExsist) {
        file.mkdir(fullPath);
    };

    const ext = '.' + file.fileExt(fileName);
    const rename = file.uniqueName();
    const renamedFileNameWithExt = rename + ext;
    const uploadFullPath = path.join(fullPath, renamedFileNameWithExt);

    await sharp(buffer).toFile(uploadFullPath);
    return {
        originalFileName: fileName,
        ext: ext,
        mainDirPath: mainDirPath,
        subDirPath: subDirPath,
        rename: rename,
        renamedFileNameWithExt: renamedFileNameWithExt,
        uploadFullPath: uploadFullPath,
    }
}