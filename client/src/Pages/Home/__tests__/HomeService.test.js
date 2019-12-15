import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getFolders} from "../HomeService";

describe('Home Service tests', () => {
    let mock, getFoldersURL;

    beforeEach(() => {
        mock = new MockAdapter(mockAxios);
        getFoldersURL = process.env.REACT_APP_SERVER_URL + '/folders/parentfolder=';
    });

    it('should get response 200 when you send integer parameter', async () => {
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

