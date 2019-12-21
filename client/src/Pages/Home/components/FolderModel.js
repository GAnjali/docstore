import React from "react";
import {
  FOLDER_NAME_PLACEHOLDER,
  NEW_FOLDER,
  SAVE
} from "../../../AppConstants";

const FolderModel = props => {
  let style = {};
  if (props.show) {
    style = { display: "block" };
  }
  return (
    <div id="myModal" className="sharingmodal" style={style}>
      <div className="foldermodal-content">
        <div className="modal-header">
          <span className={"newFolder"}>{NEW_FOLDER}</span>
          <span className="close" onClick={props.handleClose}>
            &times;
          </span>
          <textarea
            className={"sharingwith-text-area"}
            name={"newFolderName"}
            placeholder={FOLDER_NAME_PLACEHOLDER}
            onChange={props.handleFolderNameChange}
          />
          <div className="modal-save">
            <button onClick={props.handleSaveFolder}>{SAVE}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderModel;