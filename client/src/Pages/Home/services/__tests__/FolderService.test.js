import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getFolders} from "../FolderService";

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
});

