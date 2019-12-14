import React from "react";
import {shallow} from "enzyme";
import Header from "../Header";

describe("Header", () => {
    it("Should render without crashing", () => {
        shallow(<Header/>);
    });

    it('should match the Header snapshot', function () {
        const headerComponent = shallow(<Header/>);
        expect(headerComponent).toMatchSnapshot();
    });
});
