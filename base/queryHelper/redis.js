/**
 * Module exports.
 * @public
 */
exports.execute = execute;
exports.transaction = transaction;
exports.executePI = executePI;
exports.executePR = executePR;

// redis
const redis         = require('redis');

function execute(){}        // 단건 쿼리 실행

function transaction(){}    // redis의 트랜잭션은 multi를 사용하자 .

function executePI(){}      // 페이징 정보 조회

function executePR(){}      // redis의 페이징 처리는 sort 사용
