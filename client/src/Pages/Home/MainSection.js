import React from "react";
import Folders from "./Folders";
import Files from "./Files";

const MainSection = (props) => {
    return (
        <div className={"main-section"}>
            {props.folders !== undefined && (props.folders).length > 0 && <Folders folders={props.folders}/>}
            {props.files !== undefined && (props.files).length > 0 && <Files files={props.files}/>}
        </div>
    )
};

export default MainSection;