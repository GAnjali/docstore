import React from "react";
import {shallow} from "enzyme";
import Signup from "../SignupView";

describe("SignupView tests", () => {
    const props = {
        handleChange: jest.fn(),
        handleFormSubmit: jest.fn()
    };
    it("Should render without crashing", () => {
        shallow(<Signup props/>);
    });
    it('should match the signupView snapshot', function () {
        const signupComponent = shallow(<Signup props/>);
        expect(signupComponent).toMatchSnapshot();
    });
});
