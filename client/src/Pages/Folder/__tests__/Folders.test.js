import React from "react";
import {shallow} from "enzyme";
import Folders from "../Folders";

describe("Folders component tests", () => {
    let folders;
    beforeEach(() => {
        folders = [];
    });

    it("Should render without crashing", () => {
        shallow(<Folders folders={folders}/>);
    });

    it('should match the Sidebar snapshot', function () {
        const folderComponent = shallow(<Folders folders={folders}/>);
        expect(folderComponent).toMatchSnapshot();
    });
});
