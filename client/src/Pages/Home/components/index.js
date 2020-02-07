import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainSection from "./MainSection";
import FolderModel from "./FolderModel";
import FileModel from "./FileModel";

const HomeComponent = props => {
  return (
    <>
      <Header history={props.history} />
      <Sidebar
        handleAddFile={props.handleAddFile}
        handleAddFolder={props.handleAddFolder}
      />
      <MainSection />
      <FolderModel
        show={props.showFolderModel}
        updateComponent={props.updateComponent}
        handleClose={props.handleClose}
      />
      <FileModel
        editingFile={props.editingFile}
        showModel={props.showFileModel}
        isNewFile={props.isNewFile}
        updateComponent={props.updateComponent}
        handleClose={props.handleClose}
      />
    </>
  );
};


export default HomeComponent;