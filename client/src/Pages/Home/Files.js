import React from "react";
import fileIcon from "../../Util/fileicon.jpg"

const Files = (props) => {
    return (
        <div className={"files-block"}>
            <span className={"heading"}> Files </span>
            <hr/>
            {props.files.map((file, i) => (
                <div className={"file"} key={i}>
                    <img src={fileIcon} className={"file-icon"}/>
                    <hr/>
                    <p className={"file-title"}>{file.name}</p>
                </div>
            ))}
        </div>
    )
};

export default Files;