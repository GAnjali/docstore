import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../server';

chai.use(chatHttp);
const {expect} = chai;

describe('Test the File endpoints', () => {
    it('Should get all files', (done) => {
        chai.request(app)
            .get('/files')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                if (res.body.data && (res.body.data).length > 0) {
                    res.body.data.should.be.a('Array');
                    res.body.data[0].should.have.property('id');
                    res.body.data[0].should.have.property('name');
                    res.body.data[0].should.have.property('content');
                } else {
                    expect(res.body.message).to.equals("No file found");
                }
                done();
            });
    });

    it('Should create a file', (done) => {
        const file = {
            name: 'Test file',
            content: 'This is a test file in docstore app'
        };
        chai.request(app)
            .post('/files')
            .set('Accept', 'application/json')
            .send(file)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    name: file.name,
                    content: file.content
                });
                done();
            });
    });

    it('Should not create a file with incomplete parameters', (done) => {
        const file = {};
        chai.request(app)
            .post('/files')
            .set('Accept', 'application/json')
            .send(file)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('Should get a particular file', (done) => {
        const fileId = 1;
        chai.request(app)
            .get(`/files/${fileId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('content');
                done();
            });
    });

    it('Should update a file', (done) => {
        const fileId = 1;
        const updatedFile = {
            id: fileId,
            name: 'Update f',
            content: 'update file content'
        };
        chai.request(app)
            .put(`/files/${fileId}`)
            .set('Accept', 'application/json')
            .send(updatedFile)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).equal(updatedFile.id);
                expect(res.body.data.name).equal(updatedFile.name);
                expect(res.body.data.content).equal(updatedFile.content);
                done();
            });
    });

    it('Should delete a file', (done) => {
        const fileId = 1;
        chai.request(app)
            .delete(`/files/${fileId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({});
                done();
            });
    });
});