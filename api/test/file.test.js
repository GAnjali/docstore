import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server';

chai.use(chaiHttp);
const {expect} = chai;
chai.should();

describe('Test the File endpoints', () => {
    it('should get all files', (done) => {
        chai.request(app)
            .get('/files')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data.should.be.a('Array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('name');
                res.body.data[0].should.have.property('content');
                done();
            });
    });
});