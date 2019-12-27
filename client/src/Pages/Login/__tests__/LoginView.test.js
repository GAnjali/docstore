import React from "react";
import {shallow} from "enzyme";
import LoginView from "../components/LoginView";

describe("LoginView tests", () => {
    const props = {
        handleChange: jest.fn(),
        handleFormSubmit: jest.fn(),
        hasError: false,
        error: null
    };
    it("Should render without crashing", () => {
        shallow(<LoginView props/>);
    });
    it('should match the LoginView snapshot', function () {
        const loginViewComponent = shallow(<LoginView props/>);
        expect(loginViewComponent).toMatchSnapshot();
    });
});
