import React from "react";
import optionsIcon from "../../Util/optionsIcon.jpg";

const Files = (props) => {
    return (
        <div className={"files-block"}>
            <span className={"heading"}> Files </span>
            <hr/>
            {props.files.map((file, i) => (
                <div className={"file"} key={i} id={i} onClick={props.handleFileClick}>
                    <div className={"file-content"} id={i}>
                        <div className={"fileoptions"}>
                            <img src={optionsIcon} className={"fileoptions-icon"}/>
                            <div className="fileoptions-content">
                                <button className={"file-share"} id={i}>Share</button>
                                <button className={"file-delete"} id={i}>Delete</button>
                            </div>
                        </div>
                        {file.content}</div>
                    <hr/>
                    <p className={"file-title"} id={i}>{file.name}</p>
                </div>
            ))}
        </div>
    )
};

export default Files;