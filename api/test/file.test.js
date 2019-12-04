import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server';
import {describe} from "mocha";

chai.use(chaiHttp);
const {expect} = chai;
chai.should();

let fileId;

describe('Test the File endpoints', () => {
    it('Should get all files', (done) => {
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

    it('Should create a file', (done) => {
        const file = {
            name: 'Read91.md',
            content: 'This is a Docstore app'
        };
        chai.request(app)
            .post('/files')
            .set('Accept', 'application/json')
            .send(file)
            .end((err, res) => {
                fileId = res.body.data[0];
                expect(res.status).to.equal(201);
                expect(res.body.data[1]).to.equals(file.name);
                expect(res.body.data[2]).to.equals(file.content);
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

    it('Should not create a file with duplicate filename', (done) => {
        const file = {name: 'ReadME12.md'};
        chai.request(app)
            .post('/files')
            .set('Accept', 'application/json')
            .send(file)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal("Cannot create a File with Duplicate name, Please provide unique file name");
                done();
            });
    });

    it('Should update a file', (done) => {
        const updatedFile = {
            name: 'Update f',
            content: 'update file content'
        };
        chai.request(app)
            .put(`/files/${fileId}`)
            .set('Accept', 'application/json')
            .send(updatedFile)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                console.log(res.body.data);
                console.log(res.status);
                expect(res.body.data[0]).equal(updatedFile.name);
                expect(res.body.data[1]).equal(updatedFile.content);
                expect(res.body.data[2]).equal(fileId);
                done();
            });
    });

    it('Should delete a file', (done) => {
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