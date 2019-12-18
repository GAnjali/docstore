import React from "react";
import Folders from "../Folder/Folders";
import Files from "../File/Files";

const MainSection = (props) => {
    return (
        <div className={"main-section"}>
            {props.folders !== undefined && (props.folders).length > 0 &&
            <Folders folders={props.folders} handleFolderClick={props.handleFolderClick}/>}
            {props.files !== undefined && (props.files).length > 0 &&
            <Files files={props.files} handleFileClick={props.handleFileClick} handleSave={props.handleSave}/>}
        </div>
    )
};

export default MainSection;