exports.callForcast = callForcast;

const rp                        = require('request-promise');
const moment                    = require('moment');
const replaceall                = require("replaceall");
const google                    = require('./google');
const conf                      = reqlib('/app/conf');

async function callForcast(lat, lon){
  const appId = conf.apiKey.others.openweatherAppId;

  const wtApiResult = await rp({
      method: 'get',
      uri: 'http://api.openweathermap.org/data/2.5/weather',
      qs: {
          lat : lat,
          lon : lon,
          APPID : appId,
          units : 'metric'
      },
      json: true // Automatically stringifies the body to JSON
  });

  return {
    currentTime : moment().format('YYYY년 MM월 DD일 dddd a h시 mm분 ss초'),
    myLocation : replaceall("대한민국 ", "", (await google.geoCode(lat, lon)).results[1].formatted_address),
    temp : wtApiResult.main.temp + ' C',
    pressure : wtApiResult.main.pressure + ' hpa',
    humidity : wtApiResult.main.humidity + ' %',
    windSpeed : wtApiResult.wind.speed + ' m/s',
    orgText : wtApiResult.weather[0].description,
    korText : (await google.translate(wtApiResult.weather[0].description, 'en', 'ko')).text,
    sunrise : moment.unix(wtApiResult.sys.sunrise).format('a h시 mm분 ss초'),
    sunset : moment.unix(wtApiResult.sys.sunset).format('a h시 mm분 ss초')
  }
}
