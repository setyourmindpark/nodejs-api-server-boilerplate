exports.fileUpload = fileUpload;

const config = reqlib('/config');
const sharp = require('sharp');
const file = reqlib('/base/common/file');
const path = require('path');
const rootPath = require('app-root-path');
const appRootPath = rootPath.path;
let targetPath = config.setting.upload.local.mainDir;
targetPath = targetPath.charAt(0) === '/' ? targetPath : '/' + targetPath;
targetPath = targetPath.charAt(targetPath.length - 1) === '/' ? targetPath.slice(0, -1) : targetPath;
const mainDir = appRootPath + targetPath;

async function fileUpload(fileName, buffer, subDir){
    const fullPath = path.join(mainDir, subDir);
    if (!file.isExsistDir(fullPath)) {
        file.mkdir(fullPath);
    };

    const ext = '.' + file.fileExt(fileName);
    const rename = file.uniqueName();
    const renamedFileNameWithExt = rename + ext;
    const uploadFullPath = path.join(fullPath, renamedFileNameWithExt);

    await sharp(buffer).toFile(uploadFullPath);
    return {
        mainPath: mainDir,
        subPath: subDir,
        rename: rename,
        renamedFileNameWithExt: renamedFileNameWithExt,
        uploadFullPath: uploadFullPath,
    }
}