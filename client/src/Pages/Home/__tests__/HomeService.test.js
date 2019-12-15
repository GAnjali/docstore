import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getFolders, getFiles} from "../HomeService";

describe('Home Service tests', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(mockAxios);
    });

    describe('getFolders tests', () => {
        let getFoldersURL;

        beforeEach(() => {
            getFoldersURL = process.env.REACT_APP_SERVER_URL + '/folders/parentfolder=';
        });

        it('should get folders with response 200 when you send integer parameter', async () => {
            mock.onGet(getFoldersURL + `0`).reply(200);
            await getFolders(0).then((response) => {
                expect(response.status).toEqual(200);
            });
        });

        it('should get response 400 when you send non-integer parameter', async () => {
            mock.onGet(getFoldersURL + `nu`).reply(400);
            await getFolders('nu').then((errorResponse) => {
                expect(errorResponse.response.status).toEqual(400)
            });
        });
    });

    describe('getFiles tests', () => {
        let getFilesURL;

        beforeEach(() => {
            getFilesURL = process.env.REACT_APP_SERVER_URL + '/files/parentfolder=';
        });

        it('should get files with response 200 when you send integer parameter', async () => {
            mock.onGet(getFilesURL + `0`).reply(200);
            await getFiles(0).then((response) => {
                expect(response.status).toEqual(200);
            });
        });

        it('should get response 400 when you send non-integer parameter', async () => {
            mock.onGet(getFilesURL + `nu`).reply(400);
            await getFiles('nu').then((errorResponse) => {
                expect(errorResponse.response.status).toEqual(400)
            });
        });
    });
});

