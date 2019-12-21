import React from "react";
import folderIcon from "../styles/icons/foldericon.png";
import optionsIcon from "../styles/icons/optionsIcon.jpg";
import {DELETE} from "../../../AppConstants";

const Folders = props => {
  return (
    <div className="folders-block">
      <span className={"heading"}> Folders </span>
      <hr />
      <div className={"folders-list"}>
        {props.folders.map((folder, i) => (
          <div className={"folder"} id={i} key={i} onClick={props.handleFolderClick}>
            <img src={folderIcon} className={"folder-icon"} id={i} />
            <p id={i}>{folder.name}</p>
            <div className={"folderoptions"} id={i}>
              <img src={optionsIcon} className={"folderoptions-icon"} id={i} />
              <div className="fileoptions-content" id={i}>
                <button className={"folder-delete"} id={i}>
                    {DELETE}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Folders;