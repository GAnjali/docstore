import React from "react";
import {shallow} from "enzyme";
import FileModel from "../FileModel";

describe("FileModel component tests", () => {
    let props;
    beforeEach(() => {
        props = {
            editingFile: {
                name: '',
                content: ''
            },
            handleContentChange: jest.fn(),
            handleSaveFile: jest.fn(),
            handleClose: jest.fn()
        };
    });

    it("Should render without crashing", () => {
        shallow(<FileModel props/>);
    });

    it('should match the FileModel snapshot', function () {
        const fileModelComponent = shallow(<FileModel props/>);
        expect(fileModelComponent).toMatchSnapshot();
    });
});
