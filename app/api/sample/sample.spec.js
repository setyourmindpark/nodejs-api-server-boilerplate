const rootPath        = require('app-root-path');
global.reqlib         = rootPath.require;
const queryHelper     = reqlib('/app/base/queryHelper');
const should          = require('should');
const request         = require('supertest');
const app             = reqlib('/app');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTQ4NzgyNDM0M30.CN0QFUTpJx3ORwuOfYcmQNbk6Xob36lxYH_48ZN1w9g';

//http://unitjs.com/guide/should-js.html
//http://programmingsummaries.tistory.com/383

before(done => {
  ( async () => {
    try{
      const alive = await queryHelper.execute({query:'SELECT NOW() AS now FROM DUAL', expect : 'single'});
      console.log(alive.now);
      done()
    }catch(err){
      throw(err);
    }
  })()
});

describe('SAMPLE_V3', () => {
    describe('GET /api/sample/select1/param1', () => {
        it('should return sample api', done => {
            request(app)
                .get('/api/sample/select1/value1')
                .set('token', token)    // header setting
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.instanceOf(Object).and.have.property('isSuccess').be.equal('no');
                    //res.body.should.be.instanceOf(Object).and.have.property('data');
                    done();
                });
        });
    });

    describe('GET /api/sample/select2/param1/param2', () => {
        it('should return sample api', done => {
            request(app)
                .get('/api/sample/select2/valu1/value2')
                .set('token', token)    // header setting
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.instanceOf(Object).and.have.property('isSuccess').be.equal('no');
                    //res.body.should.be.instanceOf(Object).and.have.property('data');
                    done();
                });
        });
    });

    describe('POST /api/sample/insert', () => {
        it('should return sample api', done => {
            request(app)
                .post('/api/sample/insert')
                .set('token', token)
                .send({
                  "param1": "value1",
                  "param2": "value2",
                  "param3": "value3"
                })
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.instanceOf(Object).and.have.property('isSuccess').be.equal('no');
                    //res.body.should.be.instanceOf(Object).and.have.property('data');
                    done();
                });
        });
    });

    describe('PUT /api/sample/update', () => {
        it('should return sample api', done => {
            request(app)
                .put('/api/sample/update/a')
                .set('token', token)
                .send({
                  "param1": "string",
                  "param2": "value2",
                  "param3": "value3"
                })
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {

                    if (err) throw err;
                    res.body.should.be.instanceOf(Object).and.have.property('isSuccess').be.equal('ok');
                    //res.body.should.be.instanceOf(Object).and.have.property('data');
                    done();
                });
        });
    });

    describe('DELETE /api/sample/remove', () => {
        it('should return sample api', done => {
            request(app)
                .delete('/api/sample/remove/1')
                .set('token', token)
                .send({
                  "param1": "value1",
                  "param2": "value2",
                  "param3": "value3"
                })
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.instanceOf(Object).and.have.property('isSuccess').be.equal('ok');
                    //res.body.should.be.instanceOf(Object).and.have.property('data');
                    done();
                });
        });
    });
});

// after(() => {
//     console.log('after()');
//   });
