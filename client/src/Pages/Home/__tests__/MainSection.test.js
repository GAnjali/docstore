import React from "react";
import {shallow} from "enzyme";
import MainSection from "../MainSection";

describe("Main section", () => {
    it("Should render without crashing", () => {
        shallow(<MainSection/>);
    });

    it('should match the MainSection snapshot', function () {
        const mainSectionComponent = shallow(<MainSection/>);
        expect(mainSectionComponent).toMatchSnapshot();
    });
});
