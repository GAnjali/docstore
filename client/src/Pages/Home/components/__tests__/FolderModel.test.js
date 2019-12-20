import React from "react";
import {shallow} from "enzyme";
import FolderModel from "../FolderModel";

describe("FolderModel component tests", () => {
    const props = {
        handleFolderNameChange: jest.fn(),
        handleSaveFolder: jest.fn()
    };

    it("Should render without crashing", () => {
        shallow(<FolderModel props/>);
    });

    it('should match the FolderModel snapshot', function () {
        const folderModelComponent = shallow(<FolderModel props/>);
        expect(folderModelComponent).toMatchSnapshot();
    });
});
