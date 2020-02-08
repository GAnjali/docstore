import {
  FILE_CONTENT_PLACEHOLDER,
  FILE_NAME_PLACEHOLDER,
  SAVE
} from "../../../AppConstants";
import React from "react";

const FileModelComponent = props => {
  console.log(props);
  console.log(props.style);
  return (
    <div id="myModal" className="modal" style={props.style}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={props.handleClose}>
            &times;
          </span>
          <textarea
            className={"model-title"}
            value={props.title}
            placeholder={FILE_NAME_PLACEHOLDER}
            onChange={props.handleTitleChange}
          />
        </div>
        <div className="modal-body">
          <textarea
            className={"model-filecontent"}
            value={props.content}
            onChange={props.handleContentChange}
            placeholder={FILE_CONTENT_PLACEHOLDER}
          />
        </div>
        <div className="modal-save">
          <button onClick={props.handleSaveFile}>{SAVE}</button>
        </div>
      </div>
    </div>
  );
};

export default FileModelComponent;