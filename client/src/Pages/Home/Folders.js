import React from 'react';
import folderIcon from "./../../Util/index.png"

const Folders = (props) => {
    return (
        <div className="folders-block">
            <span className={"heading"}> Folders </span>
            <hr/>
            <div className={"folders-list"}>
                {props.folders.map(folder => (
                    <div className={"folder"}>
                        <img src={folderIcon} className={"folder-icon"}/>
                        <p>{folder.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Folders;