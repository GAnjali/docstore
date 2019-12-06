import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test the User endpoints', () => {
    it('Should create an user', (done) => {
        const newuser = {
            email: 'test3@gmail.com',
            password: 'test1'
        };
        chai.request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send(newuser)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    email: newuser.email
                });
                done();
            });
    });

    it('Should not create an user with an invalid email', (done) => {
        const newuser = {
            email: 'test1',
            password: 'test1'
        };
        chai.request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send(newuser)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equals("Validation error: Validation isEmail on email failed");
                done();
            });
    });

    it('Should not create an user with duplicate email', (done) => {
        const newuser = {
            email: 'test3@gmail.com',
            password: 'test1'
        };
        chai.request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send(newuser)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equals("Email address already in use!");
                done();
            });
    });

    it('Should not create an user with an empty password', (done) => {
        const newuser = {
            email: 'test2@gmail.com',
            password: ''
        };
        chai.request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send(newuser)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equals("Validation error: Validation notEmpty on password failed");
                done();
            });
    });
});