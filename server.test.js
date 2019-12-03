import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './server';
import {describe} from "mocha";
chai.use(chaiHttp);
chai.should();

describe('App',()=>{
        it('should get response 200', function (done) {
            chai.request(app).get('/').end((err,res)=>{
                res.should.have.status(200);
                done();
            })
        });
});
