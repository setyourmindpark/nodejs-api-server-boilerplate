exports.sendMessage = sendMessage;

const request               = require('request');
const conf                  = reqlib('/app/conf');
const serverKey             = conf.apiKey.push.androidServerKey;

function sendMessage(pushId, title, content){
  (async () => {
    try{
       request({
         url : 'https://fcm.googleapis.com/fcm/send',
         method : 'POST',
         headers : {
           'Content-Type' : ' application/json',
           'Authorization' : 'key=' + serverKey
         },
         body : JSON.stringify({
           data : {
             message : {
               title : title,
               content, content
             }
           },
           to : pushId
         })
       }, (error, response, body) => {
         if (error) {
           console.error(error, response, body);
         } else if (response.statusCode >= 400) {
           console.error('HTTP Error: ' + response.statusCode + ' - '
           + response.statusMessage + '\n' + body);
         } else {
           if(JSON.parse(body).failure === 1){
             console.log(' push [ ' + pushId + ' ] failed on android');
           }
         }
       });

    }catch(err){
      console.log(err);
    }
  })()
}
