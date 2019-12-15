import React from "react";
import Folders from "./Folders";

const MainSection = (props) => {
    return (
        <div className={"main-section"}>
            <Folders folders={props.folders}/>
        </div>
    )
};

export default MainSection;