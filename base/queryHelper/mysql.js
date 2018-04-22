/**
 * Module exports.
 * @public
 */
exports.createModule = createModule;

/**
 * Module dependencies.
 * @private
 */
const pagenation = require('./pagenation/mysql');
const commonQuery = require('./commonQuery/mysql');
const mysql = require('promise-mysql');
const Promise = require('bluebird');

// 환경변수를 이곳에 선언하여 로직을 구성하기싫다.. 환경변수관리는 index.js에서 하고 이곳에서는 넘겨받은 환경변수를 통해 모듈이 동작하는 로직을 구성한다. 
// module style로 module을 구현한다. 환경변수에따라 동적으로 해당 module( mysql )을 생성할수있도록... 
// 이전방식으로구현시 현재 파일에 환경변수를통해 queryModule이 동작하므로 database가 추가연결시 로직이 증가하게됨.
// 따라서 index.js에서 환경변수를 넘겨받아 module이 동적생성하여 동작하도록 변경함.
// 해당 모듈을 n 개생성할수있도록 초기화하여 생성함. mysql 설정값에따라 같은비지니스로직이 쓰일수있음( connection )
/**
* queryModule 객체를 반환함
* @return {queryModule}
* @public
*/
function createModule({ host, port, user, database, password, connectionLimit}) {
    const pool = mysql.createPool({ host, port, user, database, password, connectionLimit});

    /**
    * pool을 생성함과동시에 conn 객체 반환
    * @return {Promise} conn 객체
    * @private
    */
    async function getConnection() {
        return await pool.getConnection();
    };

    /**
    * 실제 쿼리를 수행하는 함수.
    * @param {Object}     conn 객체
    * @param {JSON}       { query : ,data : ,expect : }
    * @return {Promise}   쿼리결과 반환
    * @private
    */
    async function doQuery(conn, resource) {
        const data = await conn.query((typeof (resource.query) === 'function') ? resource.query(resource.data) : resource.query);
        if ((resource.expect || 'many') === 'single') {     //default는 many로 세팅. single이 참일경우
            if (Array.isArray(data)) return data[0];          //single을 기대하였으나 리스트로 나온경우 리스트의 0번쨰 인덱스를 리턴한다, 없으면 undefined임(select 쿼리시 기본적으로 []가 붙어서나옴 ... 그래서 이걸 정의했음)
            else return data;                                 //single 을 기대하였으나 single일경우 그대로 리턴
        } else {                                            //manay일 경우
            if (data.length === 0) return undefined;          //데이터베이스 결과값이 하나도없을경우
            else return data;                                 //리스트를 리턴
        }
    }
    const queryModule = {
        /**
        * 쿼리실행 사전준비 함수. 실제쿼리를 수행하기위해 connection 객체를 받아옴
        * @param {JSON}  { query : ,data : ,expect : }
        * @return {Promise} 쿼리결과 반환
        * @public
        */
        execute: async (resource) => {
            const conn = await getConnection();
            try {
                const data = await doQuery(conn, resource);
                conn.connection.release();
                return data;
            } catch (err) {
                conn.connection.release();
                throw err;
            }
        },
        /**
        * 페이지네이션 정보를 조회 (PagenationInfo)
        * @param {JSON} { query : ,data : ,expect : },  필수 property는 pageNo ( essential ,expect : )
        * @return {Promise} 쿼리결과 반환
        * @public
        */
        executePI: async (resource) => {
            const pageNo = resource.data.pageNo;
            if (pageNo == 0) return undefined;

            const cnt = ( await queryModule.execute({ query: resource.query, data: resource.data, expect: 'single' }) ).cnt;
            const pagenationInfo = pagenation.createModule(
                resource.data.recordCountPerPage,
                resource.data.pageSize
            ).getPagenationInfo(pageNo, cnt);
            return pagenationInfo;
        },

        /**
        * 페이징된 데이터를 조회 (PageRecord)
        * @param {JSON}  { query : ,data : ,expect : },  필수 property는 pageNo ( essential ,expect : )
        * @return {Promise} 쿼리결과 반환
        * @public
        */
        executePR: async (resource) => {
            const pageNo = resource.data.pageNo;
            if (resource.data.pageNo == 0) return undefined;

            const recordIndex = pagenation.createModule(
                resource.data.recordCountPerPage,
                resource.data.pageSize
            ).getQueryIndex(pageNo);

            resource.data.startRow = recordIndex.start;
            resource.data.endRow = recordIndex.end;
            resource.query = ''.concat(
                commonQuery.pagingPre(),
                resource.query(resource.data),
                commonQuery.pagingPost(resource.data)
            );
            return await queryModule.execute(resource);
        },
        /**
        * 트랜잭션을 수행
        * @param {Array|JSON}  [{ query : ,data : ,expect :} ]
        * @return {Promise} 트랜잭션 결과 반환
        * @public
        */
        transaction: async (resources) => {
            const conn = await getConnection();
            try {
                await conn.connection.beginTransaction();
                const data = await Promise.mapSeries(resources, (resource, index, length) => doQuery(conn, resource));
                await conn.commit();
                conn.connection.release();
                return data;
            } catch (err) {
                await conn.rollback();
                conn.connection.release();
                throw err;
            }
        }
    }
    return queryModule;
}