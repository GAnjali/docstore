import Folders from "./Folders";
import Files from "./Files";
import FileModel from "../containers/FileModel";
import ShareModel from "../containers/ShareModel";
import { NO_CONTENTS_FOUND } from "../../../AppConstants";
import React from "react";

const MainSectionComponent = props => {
  const { folders, files } = props;
  if (folders.length !== 0 || files.length !== 0) {
    return (
      <div className={"main-section"}>
        {folders !== undefined &&
          folders.length > 0 &&
          typeof folders !== "string" && (
            <Folders
              folders={props.folders}
              handleFolderClick={props.handleFolderClick}
            />
          )}
        {files !== undefined &&
          files.length > 0 &&
          typeof files !== "string" && (
            <Files
              files={files}
              handleFileClick={props.handleFileClick}
              handleSave={props.handleSave}
            />
          )}
        <FileModel
          editingFile={props.editingFile}
          showModel={props.showFileModel}
          isNewFile={false}
          handleClose={props.handleClose}
          updateComponent={props.updateComponent}
        />
        <ShareModel
          show={props.showSharingModel}
          sharingFile={props.sharingFile}
          handleClose={props.handleClose}
        />
      </div>
    );
  }
  return (
    <div className={"main-section"}>
      <span className={"emptysection"}>{NO_CONTENTS_FOUND}</span>
    </div>
  );
};

export default MainSectionComponent;