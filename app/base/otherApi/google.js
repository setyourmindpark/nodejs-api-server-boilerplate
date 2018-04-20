const translateApi              = require('google-translate-api');
const rp                        = require('request-promise');

exports.translate = translate;
exports.geoCode = geoCode;

async function translate(content, from, to){
  try{
    return await translateApi(content, {from: from, to: to})
  }catch(err){
    return undefined;
  }
}

async function geoCode(lat, lon){
  try{
    return await rp({
        method: 'get',
        uri: 'http://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            latlng : lat+','+lon,
            language : 'ko'
        },
        json: true // Automatically stringifies the body to JSON
    });
  }catch(err){
    return undefined;
  }
}
