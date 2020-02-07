import React, { Component } from "react";
import Header from "./components/Header";
import "./styles/Home.css";
import Sidebar from "./components/Sidebar";
import { addFile } from "./services/FileService";
import { addFolder } from "./services/FolderService";
import { getUserByEmail, addShare } from "./services/HomeService";
import MainSection from "./components/MainSection";
import { isLoggedIn } from "../../Util/AuthService";
import FileModel from "./components/FileModel";
import ShareModel from "./components/ShareModel";
import FolderModel from "./components/FolderModel";
import { LOGIN_URL } from "../../AppConstants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as folderActions from "./actions/folderActions";
import * as fileActions from "./actions/fileActions";
import PropTypes from "prop-types";

const intialState = {
  sharedFiles: [],
  error: "",
  editingFile: null,
  showFileModel: false,
  showFolderModel: false,
  newFolderName: "",
  newFile: false
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }

  componentDidMount() {
    localStorage.setItem("parentfolderid", 0);
    if (!isLoggedIn()) {
      this.props.history.replace(LOGIN_URL);
    } else {
      this.updateComponent(0);
    }
  }

  updateComponent = parentFolderId => {
    this.props.fileActions.fetchFiles(parentFolderId);
    this.props.folderActions.fetchFolders(parentFolderId);
  };

  handleAddNewFile = () => {
    const newFile = {
      name: "",
      content: "",
      parentfoldername: localStorage.getItem("parentfoldername")
    };
    this.setState({
      showFileModel: true,
      editingFile: newFile
    });
  };

  handleAddNewFolder = () => {
    this.setState({
      showFolderModel: true
    });
  };

  handleClose = () => {
    this.setState({
      showFileModel: false,
      showFolderModel: false,
      showSharingModel: false
    });
  };

  render() {
    return (
      <>
        <Header history={this.props.history} />
        <Sidebar
          handleAddFile={this.handleAddNewFile}
          handleAddFolder={this.handleAddNewFolder}
        />
        <MainSection />
        <FolderModel
          show={this.state.showFolderModel}
          updateComponent={this.updateComponent}
          handleClose={this.handleClose}
        />
        <FileModel
          editingFile={this.state.editingFile}
          showModel={this.state.showFileModel}
          isNewFile={true}
          updateComponent={this.updateComponent}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

Home.propTypes = {
  folderActions: PropTypes.object,
  folders: PropTypes.array,
  fileActions: PropTypes.object,
  files: PropTypes.array
};

function mapStateToProps(state) {
  return {
    folders: state.folders,
    files: state.files
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
)(Home);