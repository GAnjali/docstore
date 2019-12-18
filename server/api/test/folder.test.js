import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test Folder endpoints', () => {

    describe('create folder', () => {

        let token, newUser, newFolder;

        beforeEach(() => {
            newUser = {
                email: 'testFolderAPIs@gmail.com',
                password: 'test1'
            };
            newFolder = {
                name: 'testfolder'
            };
        });

        it('Should create a folder', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/folders').set('Accept', 'application/json').set('x-access-token', token).send(newFolder).then((response) => {
                        expect(response.status).to.equal(201);
                        expect(response.body.message).to.equals("Folder created!");
                    });
                })
            })
        });

        it('Should not create a folder without token', async () => {
            await chai.request(app).post('/folders').set('Accept', 'application/json').send(newFolder).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equals("Token is not provided");
            });
        });

        it('Should not create a folder without foldername', async () => {
            newUser.email = "testFolderAPIs1@gmail.com";
            const newFolder = {};
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/folders').set('Accept', 'application/json').set('x-access-token', token).send(newFolder).then((response) => {
                        expect(response.status).to.equal(400);
                        expect(response.body.message).to.include("notNull Violation");
                    });
                })
            })
        });

        it('Should not create a folder with duplicate foldername', async () => {
            newFolder.name = "testfolder";
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/folders').set('Accept', 'application/json').set('x-access-token', token).send(newFolder).then((response) => {
                        expect(response.status).to.equal(400);
                        expect(response.body.message).to.include("Folder name already in use");
                    });
                })
            })
        });

    });


    describe('get all folders', () => {

        let token, newUser, newFolder;
        before(() => {
            newUser = {
                email: 'testgetFolderAPIs@gmail.com',
                password: 'test1'
            };
            newFolder = {
                name: 'testgetallfolders1'
            };
        });

        it('Should get all the folders', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/folders').set('Accept', 'application/json').set('x-access-token', token).send(newFolder).then(async (res1) => {
                        await chai.request(app).get('/folders').set('Accept', 'application/json').set('x-access-token', token).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.message).to.include("Folders retrieved");
                            expect(response.body.data[0].name).to.include(newFolder.name);
                        });
                    })
                })
            })
        });
    });

    describe('delete folder', () => {

        let token, newUser, newFolder;
        before(() => {
            newUser = {
                email: 'testgetFolderAPIs@gmail.com',
                password: 'test1'
            };
            newFolder = {
                name: 'testdeletefolder2'
            };
        });

        it('Should delete folder by id', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async () => {
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/folders').set('Accept', 'application/json').set('x-access-token', token).send(newFolder).then(async (response) => {
                        const folderid = response.body.data.id;
                        await chai.request(app).delete('/folders/' + folderid).set('Accept', 'application/json').set('x-access-token', token).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.message).to.include("Folder deleted");
                        });
                    })
                })
            })
        });
    })
});