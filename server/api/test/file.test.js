import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test the File endpoints', () => {

    describe('get all files', () => {

        let token, newUser, newFile;
        before(() => {
            newUser = {
                email: 'testgetFolderAPIs@gmail.com',
                password: 'test1'
            };
            newFile = {
                name: 'testgetallfiles'
            };
        });

        it('Should get all the files', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then(async (res1) => {
                        await chai.request(app).get('/files').set('Accept', 'application/json').set('x-access-token', token).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.message).to.include("Files retrieved");
                            expect(response.body.data[0].name).to.include(newFile.name);
                        });
                    })
                })
            })
        });
    });

    describe('create file', () => {

        let token, newUser, newFile;

        beforeEach(() => {
            newUser = {
                email: 'testcreateFileAPIs@gmail.com',
                password: 'test1'
            };
            newFile = {
                name: 'testfile2'
            };
        });

        it('Should create a file', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then((response) => {
                        expect(response.status).to.equal(201);
                        expect(response.body.message).to.equals("File Added!");
                    });
                })
            })
        });

        it('Should not create a file without token', async () => {
            await chai.request(app).post('/files').set('Accept', 'application/json').send(newFile).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equals("Token is not provided");
            });
        });

        it('Should not create a file without filename', async () => {
            newUser.email = "testFileAPIs1@gmail.com";
            const newFile = {};
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then((response) => {
                        expect(response.status).to.equal(400);
                        expect(response.body.message).to.include("notNull Violation");
                    });
                })
            })
        });

        it('Should not create a file with duplicate filename', async () => {
            newFile.name = "testfile2";
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then((response) => {
                        expect(response.status).to.equal(400);
                        expect(response.body.message).to.include("File name already in use");
                    });
                })
            })
        });
    });

    describe('delete file', () => {

        let token, newUser, newFile;
        before(() => {
            newUser = {
                email: 'testdeleteFileAPIs@gmail.com',
                password: 'test1'
            };
            newFile = {
                name: 'testdeletefile2'
            };
        });

        it('Should delete file by id', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then(async (response) => {
                        const fileid = response.body.data.id;
                        await chai.request(app).delete('/files/' + fileid).set('Accept', 'application/json').set('x-access-token', token).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.message).to.include("File deleted");
                        });
                    })
                })
            })
        });
    });

    describe('update file', () => {

        let token, newUser, newFile;
        before(() => {
            newUser = {
                email: 'testupdateFileAPIs@gmail.com',
                password: 'test1'
            };
            newFile = {
                name: 'testupdatefile2',
                content: "test file content"
            };
        });

        it('Should update file by id', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then(async (response) => {
                        const fileid = response.body.data.id;
                        newFile.content = "update test file content";
                        await chai.request(app).put('/files/' + fileid).set('Accept', 'application/json').set('x-access-token', token).send(newFile).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.message).to.include("File updated");
                            expect(response.body.data.content).to.include(newFile.content);
                        });
                    })
                })
            })
        });
    })
});