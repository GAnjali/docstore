import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test Share endpoints', () => {

    describe('create share', () => {
        let token, newUser, newFile, newShare;
        before(() => {
            newUser = {
                email: 'testCreateShareAPIs2@gmail.com',
                password: 'test1'
            };
            newFile = {
                name: 'testShareAPIfile2',
                content: "test file content"
            };
            newShare = {
                userid: null,
                shareType: "View",
                fileid: null
            };
        });
        it('should create a share with proper share payload', async () => {
            await chai.request(app).post('/users').set('Accept', 'application/json').send(newUser).then(async (userRes) => {
                const userid = userRes.body.data.id;
                await chai.request(app).post('/users/login').set('Accept', 'application/json').send(newUser).then(async (res) => {
                    token = res.body.data;
                    await chai.request(app).post('/files').set('Accept', 'application/json').set('x-access-token', token).send(newFile).then(async (fileResponse) => {
                        const fileid = fileResponse.body.data.id;
                        newShare.userid = userid;
                        newShare.fileid = fileid;
                        await chai.request(app).post('/shares').set('Accept', 'application/json').set('x-access-token', token).send(newShare).then((shareResponse) => {
                            expect(shareResponse.status).to.equal(200);
                        })
                    })
                })
            });
        })
    })

});