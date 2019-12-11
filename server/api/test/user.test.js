import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test User endpoints', () => {

    describe('create user', () => {
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

    describe('login user', () => {

        before((done) => {
            const newuser = {
                email: 'test3@gmail.com',
                password: 'test1'
            };
            chai.request(app).post('/users').set('Accept', 'application/json').send(newuser).end(done());
        });

        it('Should login an user with proper credentials', (done) => {
            const loginuser = {
                email: 'test3@gmail.com',
                password: 'test1'
            };
            chai.request(app)
                .post('/users/login')
                .set('Accept', 'application/json')
                .send(loginuser)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equals("Token generated");
                    done();
                });
        });

        it('Should not login an user with incorrect credentials', (done) => {
            const loginuser = {
                email: 'test3@gmail.com',
                password: 'test2'
            };

            chai.request(app)
                .post('/users/login')
                .set('Accept', 'application/json')
                .send(loginuser)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.equals("The credentials you provided is incorrect");
                    done();
                });
        });

        it('Should not login an user with incorrect email', (done) => {
            const loginuser = {
                email: 'test3@gcom',
                password: 'test2'
            };
            chai.request(app)
                .post('/users/login')
                .set('Accept', 'application/json')
                .send(loginuser)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.equals("Please enter a valid email address");
                    done();
                });
        });
    });

    describe('update user', () => {

        const updateuser = {
            email: 'test3@gmail.com',
            password: 'test1'
        };
        before((done) => {
            chai.request(app).post('/users').set('Accept', 'application/json').send(updateuser).end(done());
        });

        it('Should update an user', (done) => {
            updateuser.password = "test2";

            chai.request(app)
                .put('/users/update')
                .set('Accept', 'application/json')
                .send(updateuser)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equals("User updated");
                    done();
                });
        });

        it('Should fail updating user with a non registered user', (done) => {
            updateuser.email = "test5@gmail.com";

            chai.request(app)
                .put('/users/update')
                .set('Accept', 'application/json')
                .send(updateuser)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.message).to.contains("Cannot find user with the email");
                    done();
                });
        });

        it('Should fail updating user with an invalid user', (done) => {
            updateuser.email = "test5sdgk";

            chai.request(app)
                .put('/users/update')
                .set('Accept', 'application/json')
                .send(updateuser)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.contains("Please enter a valid email address");
                    done();
                });
        });
    });
});