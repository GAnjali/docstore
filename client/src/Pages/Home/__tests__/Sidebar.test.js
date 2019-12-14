import React from "react";
import {shallow} from "enzyme";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
    it("Should render without crashing", () => {
        shallow(<Sidebar/>);
    });

    it('should match the Sidebar snapshot', function () {
        const sidebarComponent = shallow(<Sidebar/>);
        expect(sidebarComponent).toMatchSnapshot();
    });
});
