import React from "react";
import {
  FILE_CONTENT_PLACEHOLDER,
  FILE_NAME_PLACEHOLDER,
  SAVE
} from "../../../AppConstants";

const FileModel = props => {
  let style = {},
    title = "",
    content = "";

  if (props.show) {
    style = { display: "block" };
    title = props.editingFile.name != null ? props.editingFile.name : title;
    content =
      props.editingFile.content != null ? props.editingFile.content : title;
  }

  return (
    <div id="myModal" className="modal" style={style}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={props.handleClose}>
            &times;
          </span>
          <textarea
            className={"model-title"}
            value={title}
            placeholder={FILE_NAME_PLACEHOLDER}
            onChange={props.handleTitleChange}
          />
        </div>
        <div className="modal-body">
          <textarea
            className={"model-filecontent"}
            value={content}
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

export default FileModel;
