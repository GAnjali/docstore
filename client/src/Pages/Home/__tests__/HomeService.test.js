import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getFolders, getFiles, getFileByid, updateFile, deleteFile} from "../HomeService";

describe('Home Service tests', () => {
    let mock, apiURL;

    beforeEach(() => {
        mock = new MockAdapter(mockAxios);
    });

    describe('getFolders tests', () => {

        beforeEach(() => {
            apiURL = process.env.REACT_APP_SERVER_URL + '/folders/parentfolder=';
        });

        it('should get folders with response 200 when you send integer parameter', async () => {
            mock.onGet(apiURL + `0`).reply(200);
            await getFolders(0).then((response) => {
                expect(response.status).toEqual(200);
            });
        });

        it('should get response 400 when you send non-integer parameter', async () => {
            mock.onGet(apiURL + `nu`).reply(400);
            await getFolders('nu').then((errorResponse) => {
                expect(errorResponse.response.status).toEqual(400)
            });
        });
    });

    describe('getFiles tests', () => {

        beforeEach(() => {
            apiURL = process.env.REACT_APP_SERVER_URL + '/files/parentfolder=';
        });

        it('should get files with response 200 when you send integer parameter', async () => {
            mock.onGet(apiURL + `0`).reply(200);
            await getFiles(0).then((response) => {
                expect(response.status).toEqual(200);
            });
        });

        it('should get response 400 when you send non-integer parameter', async () => {
            mock.onGet(apiURL + `nu`).reply(400);
            await getFiles('nu').then((errorResponse) => {
                expect(errorResponse.response.status).toEqual(400)
            });
        });
    });

    describe('getFileByid tests', () => {

        beforeEach(() => {
            apiURL = process.env.REACT_APP_SERVER_URL + '/files/';
        });

        it('should get file with response 200 when you send integer parameter', async () => {
            mock.onGet(apiURL + `1`).reply(200);
            await getFileByid(1).then((response) => {
                expect(response.status).toEqual(200);
            });
        });

        it('should get response 400 when you send non-integer parameter', async () => {
            mock.onGet(apiURL + `nu`).reply(400);
            await getFileByid('nu').then((errorResponse) => {
                expect(errorResponse.response.status).toEqual(400)
            });
        });
    });

    describe('updateFile tests', () => {

        const fileToUpdate = {
            "id": 1,
            "name": "testing file",
            content: "update content"
        };
        beforeEach(() => {
            apiURL = process.env.REACT_APP_SERVER_URL + '/files/';
        });

        it('should get response 200 with file updated response message', async () => {
            mock.onPut(apiURL + `1`).reply(200);
            await updateFile(fileToUpdate).then((response) => {
                expect(response.status).toEqual(200);
            });
        });
    });

    describe('deleteFile tests', () => {

        beforeEach(() => {
            apiURL = process.env.REACT_APP_SERVER_URL + '/files/';
        });

        it('should get response 200 with file deleted response message', async () => {
            mock.onDelete(apiURL + '1').reply(200);
            await deleteFile(1).then((response) => {
                expect(response.status).toEqual(200);
            });
        });
    });
});

