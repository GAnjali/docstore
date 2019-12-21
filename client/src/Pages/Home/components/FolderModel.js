import React from "react";
import {
  FOLDER_NAME_PLACEHOLDER,
  NEW_FOLDER,
  SAVE
} from "../../../AppConstants";

const FolderModel = props => {
  const { show, handleClose, handleSaveFolder, handleFolderNameChange } = props;
  let style = {};
  if (show) {
    style = { display: "block" };
  }
  return (
    <div id="myModal" className="sharingmodal" style={style}>
      <div className="foldermodal-content">
        <div className="modal-header">
          <span className={"newFolder"}>{NEW_FOLDER}</span>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <textarea
            className={"sharingwith-text-area"}
            name={"newFolderName"}
            placeholder={FOLDER_NAME_PLACEHOLDER}
            onChange={handleFolderNameChange}
          />
          <div className="modal-save">
            <button onClick={handleSaveFolder}>{SAVE}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderModel;