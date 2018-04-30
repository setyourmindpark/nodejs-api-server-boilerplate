
// exports.handleFileUpload = handleFileUpload;
// exports.handleThumbNailUpload = handleThumbNailUpload;

// const aws = require('aws-sdk');
// const fileType = require('file-type');
// const uuidV4 = require('uuid/v4');             //http://hyeonjae.github.io/uuid/2015/03/17/uuid.html
// const conf = reqlib("/app/conf");
// const sharp = require('sharp');
// const file = reqlib('/app/base/assistant/file');
// const s3Config = conf.config.upload.s3;
// aws.config.region = 'ap-northeast-2'; //Seoul
// aws.config.update({
//   accessKeyId: s3Config.accessKeyId,
//   secretAccessKey: s3Config.secretAccessKey
// });

// function uploadFile(){

// }

// function handleFileUpload(paramObj, toCheckObj) {
//   //업로드가 true 체크
//   (async () => {
//     try {
//       const buffer = paramObj['buffer'];
//       const bucket = toCheckObj['bucket'];
//       const fileName = paramObj['fileName'];
//       const rename = file.uniqueName();
//       const mimeType = fileType(buffer).mime;

//       //파일업로드
//       const result = await fileUpload(rename, buffer, mimeType, bucket);

//       if (result.isUploaded) {
//         const context = {
//           target: 's3',
//           originalFilename: fileName,
//           s3FileUniqeName: result.uploadedObj.ETag,
//           s3FileUrl: result.uploadedObj.Location,
//           s3FileKeyName: result.uploadedObj.key,
//           s3FilePathBucket: result.uploadedObj.Bucket
//         }
//         return {
//           isDone: true,
//           uploadedObj: context
//         }
//       }
//     } catch (err) {
//       throw err;
//     }
//   })();
// }

// async function handleThumbNailUpload(paramObj, toCheckObj) {
//   try {
//     const buffer = paramObj['buffer'];
//     const width = toCheckObj['width'];
//     const height = toCheckObj['height'];
//     const bucket = toCheckObj['bucket'];
//     const fileName = paramObj['fileName'];
//     const mimeType = fileType(buffer).mime;
//     const rename = file.uniqueName();

//     const resizedObj = await getResizedthumbnailBuffer(buffer, width, height);
//     if (resizedObj.isDone) {
//       const resizedBuffer = resizedObj.buffer;
//       const result = await fileUpload(rename, resizedBuffer, mimeType, bucket);

//       if (result.isUploaded) {
//         const context = {
//           s3TbnUniqeName: result.uploadedObj.ETag,
//           s3TbnUrl: result.uploadedObj.Location,
//           s3TbnKeyName: result.uploadedObj.key,
//           s3TbnPathBucket: result.uploadedObj.Bucket
//         }
//         return {
//           isDone: true,
//           uploadedObj: context
//         }
//       }
//     }

//   } catch (err) {
//     throw err;
//   }
// }

// async function fileUpload(renamedFileName, buffer, mimeType, bucket) {
//   return new Promise((resolve, reject) => {
//     try {
//       const s3 = new aws.S3({
//         params: {
//           Bucket: bucket,
//           Key: renamedFileName,
//           ACL: 'public-read',
//           ContentType: mimeType
//         }
//       });

//       s3.upload({ Body: buffer })
//         .send(function (err, data) {
//           if (err) throw err;
//           resolve({
//             isUploaded: true,
//             uploadedObj: data
//           });
//         })
//     } catch (err) {
//       reject(err);
//     }
//   })
// }

// async function getResizedthumbnailBuffer(buffer, width, height) {
//   try {
//     const data = await sharp(buffer)
//       .resize(width || 100, height || 100)      //default 100으로 설정함
//       .toBuffer();
//     return {
//       isDone: true,
//       buffer: data
//     }

//   } catch (err) {
//     throw err;
//   }
// }
