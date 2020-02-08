import React, { Component } from "react";
import { SUCCESS } from "../../../AppConstants";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as folderActions from "../actions/folderActions";
import * as fileActions from "../actions/fileActions";
import { getShare, getUserByEmail } from "../services/HomeService";
import { deleteFile, getFileByid } from "../services/FileService";
import { getUser } from "../../../Util/localStorageUtil";
import ResponseUtil from "../../../Util/ResponseUtil";
import { deleteFolder } from "../services/FolderService";
import MainSectionComponent from "../components/MainSection";
const responseUtil = new ResponseUtil();

const intialState = {
  editingFile: null,
  showFileModel: false,
  error: "",
  showSharingModel: false,
  sharingFile: null
};

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }

  updateComponent = parentFolderId => {
    this.props.fileActions.fetchFiles(parentFolderId);
    this.props.folderActions.fetchFolders(parentFolderId);
  };

  isSharedFile = fileId => {
    return this.props.sharedFiles.includes(fileId);
  };

  getUserId = async () => {
    const getUserResponse = responseUtil.getResponse(
      await getUserByEmail(getUser())
    );
    if (getUserResponse.status === SUCCESS) {
      return getUserResponse.data.id;
    }
    // else {
    //         error: getUserResponse.message
    // }
  };

  handleEditFile = async (fileId, isSharedFile) => {
    if (isSharedFile) {
      const share = await getShare(await this.getUserId(), fileId);
      const shareType = share.data.data[0].sharetype;
      if (shareType !== "Modify") {
        alert("You not permitted to Modify this File, You can only View");
        this.setState({
          error: "You not permitted to Modify this File, You can only View"
        });
      }
    }
    const getFileByIdResponse = responseUtil.getResponse(
      await getFileByid(fileId)
    );
    if (getFileByIdResponse.status === SUCCESS) {
      this.setState({
        editingFile: getFileByIdResponse.data,
        showFileModel: true
      });
    } else {
      this.setState({
        error: getFileByIdResponse.message
      });
    }
  };

  handleDeleteFile = async fileId => {
    const deleteResponse = await deleteFile(fileId);
    if (deleteResponse.status === 200) {
      this.updateComponent(localStorage.getItem("parentfolderid"));
    } else {
      this.setState({
        error: deleteResponse.message
      });
    }
  };

  handleShareFile = fileindex => {
    this.setState({
      showSharingModel: true,
      sharingFile: this.props.files[fileindex]
    });
    //share service request
  };

  handleFileActions = async event => {
    if (event.target.id !== undefined) {
      const isSharedFile = this.isSharedFile(this.props.files[event.target.id]);
      switch (event.target.className) {
        case "file-content":
          this.handleEditFile(
            this.props.files[event.target.id].id,
            isSharedFile
          );
          break;
        case "file-delete":
          this.handleDeleteFile(
            this.props.files[event.target.id].id,
            isSharedFile
          );
          break;
        case "file-share":
          this.handleShareFile(event.target.id, isSharedFile);
          break;
      }
    }
  };

  handleFolderActions = async event => {
    if (event.target.className === "folder-delete") {
      this.handleDeleteFolder(this.props.folders[event.target.id].id);
    } else if (event.target.className !== "folder-share") {
      localStorage.setItem(
        "parentfolderid",
        this.props.folders[event.target.id].id
      );
      localStorage.setItem(
        "parentfoldername",
        this.props.folders[event.target.id].name
      );
      this.updateComponent(this.props.folders[event.target.id].id);
    }
  };

  handleDeleteFolder = async folderid => {
    const deleteFolderResponse = await deleteFolder(folderid);
    if (deleteFolderResponse.status === 200) {
      this.updateComponent(localStorage.getItem("parentfolderid"));
    } else {
      this.setState({
        error: deleteFolderResponse.message
      });
    }
  };

  handleClose = () => {
    this.setState({
      showFileModel: false,
      showSharingModel: false
    });
  };

  render() {
    return (
      <MainSectionComponent
        files={this.props.files}
        folders={this.props.folders}
        handleFolderClick={this.handleFolderActions}
        handleFileClick={this.handleFileActions}
        handleSave={this.props.handleSave}
        editingFile={this.state.editingFile}
        showFileModel={this.state.showFileModel}
        handleClose={this.handleClose}
        updateComponent={this.updateComponent}
        showSharingModel={this.state.showSharingModel}
        sharingFile={this.state.sharingFile}
      />
    );
  }
}

MainSection.propTypes = {
  folderActions: PropTypes.object,
  folders: PropTypes.array,
  fileActions: PropTypes.object,
  files: PropTypes.array,
  sharedFiles: PropTypes.array
};

function mapStateToProps(state) {
  return {
    folders: state.folders,
    files: state.files,
    sharedFiles: state.sharedFiles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    folderActions: bindActionCreators(folderActions, dispatch),
    fileActions: bindActionCreators(fileActions, dispatch)
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainSection);
