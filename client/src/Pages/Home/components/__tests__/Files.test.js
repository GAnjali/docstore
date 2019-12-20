import React from "react";
import {shallow} from "enzyme";
import Files from "../Files";

describe("files component tests", () => {
    let files;
    beforeEach(() => {
        files = [];
    });

    it("Should render without crashing", () => {
        shallow(<Files files={files}/>);
    });

    it('should match the Files snapshot', function () {
        const filesComponent = shallow(<Files files={files}/>);
        expect(filesComponent).toMatchSnapshot();
    });
});
