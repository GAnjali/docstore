import React from "react";
import Header from "../containers/Header";
import Sidebar from "./Sidebar";
import MainSection from "../containers/MainSection";
import FileModel from "./../containers/FileModel";
import FolderModel from "../containers/FolderModel";

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