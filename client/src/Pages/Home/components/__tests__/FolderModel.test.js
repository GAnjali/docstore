import React from "react";
import {shallow} from "enzyme";
import FolderModelComponent from "../FolderModelComponent";

describe("FolderModelComponent component tests", () => {
    const props = {
        handleFolderNameChange: jest.fn(),
        handleSaveFolder: jest.fn()
    };

    it("Should render without crashing", () => {
        shallow(<FolderModelComponent props/>);
    });

    it('should match the FolderModelComponent snapshot', function () {
        const folderModelComponent = shallow(<FolderModelComponent props/>);
        expect(folderModelComponent).toMatchSnapshot();
    });
});
