import React from "react";
import {shallow} from "enzyme";
import ShareModel from "../ShareModel";

describe("ShareModel component tests", () => {
    const props = {
        handleShare: jest.fn(),
        handleInput: jest.fn(),
        show: false
    };

    it("Should render without crashing", () => {
        shallow(<ShareModel props/>);
    });

    it('should match the ShareModel snapshot', function () {
        const shareModelComponent = shallow(<ShareModel props/>);
        expect(shareModelComponent).toMatchSnapshot();
    });
});
