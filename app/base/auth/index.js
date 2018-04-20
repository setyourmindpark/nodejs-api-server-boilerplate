
exports.accessTokenIsAuthenticated = accessTokenIsAuthenticated;
exports.generateAccessToken = generateAccessToken;
exports.refreshTokenIsAuthenticated = refreshTokenIsAuthenticated;
exports.generateRefreshToken = generateRefreshToken;
exports.decodeAccessToken = decodeAccessToken;
exports.decodeRefreshToken = decodeRefreshToken;

const conf = reqlib("/app/conf");

let accessJwtModule = undefined;
let refreshJwtModule = undefined;

const type = conf.context.auth;
const jwt = require('./jwt');

if (type === 'jwt') {
  const accessJwtConfig = conf.config.auth.jwt.access;
  accessJwtModule = jwt.createModule(accessJwtConfig);
  const refreshJwtConfig = conf.config.auth.jwt.refresh;
  refreshJwtModule = jwt.createModule(refreshJwtConfig);
}

function accessTokenIsAuthenticated(...args) {
  return accessJwtModule.isAuthenticated(args[0], args[1], args[2], args[3], args[4]);
}

function generateAccessToken(...args) {
  return accessJwtModule.generateToken(args[0], args[1], args[2], args[3], args[4]);
}

function refreshTokenIsAuthenticated(...args) {
  return refreshJwtModule.isAuthenticated(args[0], args[1], args[2], args[3], args[4]);
}

function generateRefreshToken(...args) {
  return refreshJwtModule.generateToken(args[0], args[1], args[2], args[3], args[4]);
}

function decodeAccessToken(...args) {
  return accessJwtModule.decode(args[0], args[1], args[2], args[3], args[4]);
}

function decodeRefreshToken(...args) {
  return refreshJwtModule.decode(args[0], args[1], args[2], args[3], args[4]);
}