import React from "react";
import optionsIcon from "../styles/icons/optionsIcon.jpg";
import { DELETE, FILES_HEADER, SHARE } from "../../../AppConstants";

const Files = props => {
  return (
    <div className={"files-block"}>
      <span className={"heading"}> {FILES_HEADER} </span>
      <hr />
      {props.files.map((file, id) => (
        <div className={"file"} key={id} id={id} onClick={props.handleFileClick}>
          <div className={"file-content"} id={id}>
            <div className={"fileoptions"}>
              <img src={optionsIcon} className={"fileoptions-icon"} />
              <div className="fileoptions-content">
                <button className={"file-share"} id={id}>
                  {SHARE}
                </button>
                <button className={"file-delete"} id={id}>
                  {DELETE}
                </button>
              </div>
            </div>
            {file.content}
          </div>
          <hr />
          <p className={"file-title"} id={id}>
            {file.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Files;