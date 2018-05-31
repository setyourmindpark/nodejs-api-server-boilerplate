exports.fileUpload = fileUpload;

const sharp = require('sharp');
const file = require('@root/base/common/file');
const path = require('path');
const rootPath = require('app-root-path');
const appRootPath = rootPath.path;
const { commonDir, storeDir } = config.setting.upload.local;
let targetPath = path.join(commonDir, storeDir);
targetPath = targetPath.charAt(0) === '/' ? targetPath : '/' + targetPath;
const mainDir = appRootPath + targetPath;

async function fileUpload(fileName, buffer, subDir = '/'){
    let fullPath = undefined;
    fullPath = path.join(mainDir, subDir);    

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