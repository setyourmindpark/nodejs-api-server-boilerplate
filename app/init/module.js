
exports.initialize = initialize;

const authorizer = reqlib('/base/authorizer');
const queryHelper = reqlib('/base/queryHelper');
const sequelize = reqlib('/base/sequelize');

async function initialize(){
    // service module initialize. 
    // initialize module you want to use. 
    // 기본적으로 sequelize를 사용. sequelize에서 언급에따라 퍼포먼스나 트랜잭션 이슈와같은 사항으로는 queryHelper를 사용.
    // 2개의 모듈 모두 load. 경우에따라 사용하는 모듈이 달라질수있음.
    const { queryHelperModule1 } = await queryHelper.createModules();
    const { sequelizeModule1 } = await sequelize.createModules();
    const { jwtAcess, jwtRefresh } = authorizer.createModules();
    reqlib('/app/common/modules').initialize(
        queryHelperModule1,
        sequelizeModule1,
        jwtAcess,
        jwtRefresh
    )
}