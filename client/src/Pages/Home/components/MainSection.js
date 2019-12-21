import React from "react";
import Folders from "./Folders";
import Files from "./Files";
import { NO_CONTENTS_FOUND } from "../../../AppConstants";

const MainSection = props => {
  if (props.folders.length !== 0 || props.files.length !== 0) {
    return (
      <div className={"main-section"}>
        {props.folders !== undefined && props.folders.length > 0 && (
          <Folders
            folders={props.folders}
            handleFolderClick={props.handleFolderClick}
          />
        )}
        {props.files !== undefined && props.files.length > 0 && (
          <Files
            files={props.files}
            handleFileClick={props.handleFileClick}
            handleSave={props.handleSave}
          />
        )}
      </div>
    );
  }
  return (
    <div className={"main-section"}>
      <span className={"emptysection"}>{NO_CONTENTS_FOUND}</span>
    </div>
  );
};

export default MainSection;