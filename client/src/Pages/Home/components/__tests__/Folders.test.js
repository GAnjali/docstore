import React from "react";
import {shallow} from "enzyme";
import Folders from "../Folders";

describe("Folders component tests", () => {
    const folders=[];

    it("Should render without crashing", () => {
        shallow(<Folders folders={folders}/>);
    });

    it('should match the Folders snapshot', function () {
        const folderComponent = shallow(<Folders folders={folders}/>);
        expect(folderComponent).toMatchSnapshot();
    });
});
