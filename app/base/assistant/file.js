exports.makeDirContext = makeDirContext;
exports.mkdir = mkdir;
exports.isExsistDir = isExsistDir;
exports.fileExt = fileExt;
exports.uniqueName = uniqueName;

const path = require('path');
const mkdirp = require('mkdirp');
const uuidV4 = require('uuid/v4');             //http://hyeonjae.github.io/uuid/2015/03/17/uuid.html
const replaceall = require("replaceall");
const fs = require('fs');
const moment = require('moment');

function fileExt(filename) {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length);
}

function uniqueName() {
    return replaceall('-', '', uuidV4());
};

function isExsistDir(path) {
    if (!fs.existsSync(path)) {
        return false;
    }
    return true;
};

function mkdir(path) {
    mkdirp.sync(path);
    return true;
};

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

    if (!isExsistDir(fullPath)) {
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
