import React from 'react';
import folderIcon from "../../Util/foldericon.png"
import optionsIcon from "../../Util/optionsIcon.jpg";

const Folders = (props) => {
    return (
        <div className="folders-block">
            <span className={"heading"}> Folders </span>
            <hr/>
            <div className={"folders-list"}>
                {props.folders.map((folder, i) => (
                    <div className={"folder"} key={i}>
                        <img src={folderIcon} className={"folder-icon"}/>
                        <p>{folder.name}</p>
                        <div className={"folderoptions"}>
                            <img src={optionsIcon} className={"folderoptions-icon"}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Folders;