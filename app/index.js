const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conf = reqlib("/app/conf");
const constant = reqlib('/app/base/constant');
const rootPath = require('app-root-path').path;
const response = reqlib('/app/base/response');
const env = conf.env;

//cross doamin handling
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') return false;        //브라우저 사이트 아이콘 favicon 현재정의하지않기에 return false.
  //favicon 있을시 해제해야함. 없을때 현재 분기처리하지않으면 아래 app level middleware까지 오게됨 .
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', `Origin,Accept, Content-Type, Authorization, Content-Length, X-Requested-With, ${conf.auth.param}`);
  res.setHeader('Access-Control-Allow-Headers', `Origin,Accept, Content-Type, Authorization, Content-Length, X-Requested-With`);
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// swagger는 dev mode일때만 사용할것 .

app.use('/swgr/smpl', reqlib('/app/api/doc/swgr/smpl/swgr.router'));
app.use('/api/smpl', reqlib('/app/api/smpl/smpl.router'));      // /swgr/smpl/?url=v2

app.use('/swgr', reqlib('/app/api/doc/swgr/router'));
app.use('/api/user', reqlib('/app/api/user/user.router'));      // /swgr/smpl/?url=v2

app.use(express.static(rootPath + '/app/public'));          // static files. upload 접근 포함

app.use((req, res, next) => {
  response.notFoundResponse(res);
});

module.exports = app;
