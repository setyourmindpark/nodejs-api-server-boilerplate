exports.initialize = initialize;
exports.accessTokenIsAuthenticated = accessTokenIsAuthenticated;
exports.generateAccessToken = generateAccessToken;
exports.refreshTokenIsAuthenticated = refreshTokenIsAuthenticated;
exports.generateRefreshToken = generateRefreshToken;
exports.decodeAccessToken = decodeAccessToken;
exports.decodeRefreshToken = decodeRefreshToken;

const config = reqlib('/config');
const jwt = require('./jwt');
const type = config.context.auth;
let accessJwtModule = undefined;
let refreshJwtModule = undefined;

function initialize() {
    if (type === 'jwt') {
        const accessJwtConfig = config.setting.auth.jwt.access;
        accessJwtModule = jwt.createModule(accessJwtConfig);
        const refreshJwtConfig = config.setting.auth.jwt.refresh;
        refreshJwtModule = jwt.createModule(refreshJwtConfig);
    }
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