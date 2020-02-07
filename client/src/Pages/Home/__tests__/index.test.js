import React from "react";
import {shallow} from "enzyme";
import Home from "../components";

describe("Home", () => {

    let historyMock, props;
    beforeEach(() => {
        historyMock = {replace: jest.fn()};
        props = {
            history: historyMock
        };
    });

    it("Should render without crashing", () => {
        shallow(<Home {...props}/>);
    });

    it('should match the Home snapshot', function () {
        const homeComponent = shallow(<Home {...props}/>);
        expect(homeComponent).toMatchSnapshot();
    });
});
