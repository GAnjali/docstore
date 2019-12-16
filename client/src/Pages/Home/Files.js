import React from "react";

const Files = (props) => {
    return (
        <div className={"files-block"}>
            <span className={"heading"}> Files </span>
            <hr/>
            {props.files.map((file, i) => (
                <div className={"file"} key={i} id={i} onClick={props.handleFileClick}>
                    <p className={"file-content"} id={i}>{file.content}</p>
                    <hr/>
                    <p className={"file-title"} id={i}>{file.name}</p>
                </div>
            ))}
        </div>
    )
};

export default Files;