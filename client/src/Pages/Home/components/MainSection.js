import React from "react";
import Folders from "./Folders";
import Files from "./Files";
import { NO_CONTENTS_FOUND } from "../../../AppConstants";

const MainSection = props => {
  const { folders, files } = props;
  if (folders.length !== 0 || files.length !== 0) {
    return (
      <div className={"main-section"}>
        {folders !== undefined &&
          folders.length > 0 &&
          typeof folders !== "string" && (
            <Folders
              folders={folders}
              handleFolderClick={props.handleFolderClick}
            />
          )}
        {folders !== undefined &&
          folders.length > 0 &&
          typeof folders !== "string" && (
            <Files
              files={files}
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