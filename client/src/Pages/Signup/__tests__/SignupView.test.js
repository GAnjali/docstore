import React from "react";
import {shallow} from "enzyme";
import Signup from "../index";

describe("Signup", () => {
    const props = {
        handleChange: jest.fn(),
        handleFormSubmit: jest.fn()
    };
    it("Should render without crashing", () => {
        shallow(<Signup props/>);
    });
    it('should match the signup snapshot', function () {
        const signupComponent = shallow(<Signup props/>);
        expect(signupComponent).toMatchSnapshot();
    });
});
