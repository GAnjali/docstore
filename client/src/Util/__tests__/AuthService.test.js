import {isTokenExpired} from "../AuthService";
import jwt from 'jsonwebtoken';

describe("AuthService tests", () => {
    let token;
    it("should return false for invalid token", () => {
        token = "simpletoken";
        expect(isTokenExpired(token)).toEqual(false);
    });

    it('should return false for new generated token', function () {
        token = jwt.sign({
                userId: 1
            },
            'secret', {expiresIn: '1h'}
        );
        expect(isTokenExpired(token)).toEqual(false);
    });
});
