import React from "react";
import folderIcon from "../styles/icons/foldericon.png";
import optionsIcon from "../styles/icons/optionsIcon.jpg";
import { DELETE, FOLDERS_HEADER } from "../../../AppConstants";

const Folders = props => {
  const { handleFolderClick, folders } = props;
  return (
    <div className="folders-block">
      <span className={"heading"}> {FOLDERS_HEADER} </span>
      <hr />
      <div className={"folders-list"}>
        {folders.map((folder, id) => (
          <div
            className={"folder"}
            id={id}
            key={id}
            onClick={handleFolderClick}
          >
            <img src={folderIcon} className={"folder-icon"} id={id} />
            <p id={id}>{folder.name}</p>
            <div className={"folderoptions"} id={id}>
              <img src={optionsIcon} className={"folderoptions-icon"} id={id} />
              <div className="fileoptions-content" id={id}>
                <button className={"folder-delete"} id={id}>
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