import React, { Component } from "react";
import { addFolder } from "../services/FolderService";
import FolderModelComponent from "../components/FolderModel";

class FolderModel extends Component {
  constructor(props) {
    super(props);
    this.state = { newFolderName: "", error: "" };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSaveFolder = async () => {
    const newFolder = { name: this.state.newFolderName };
    await addFolder(newFolder)
      .then(() => {
        this.props.handleClose();
        this.props.updateComponent(localStorage.getItem("parentfolderid"));
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  };

  render() {
    const { show, handleClose } = this.props;
    let style = {};
    if (show) {
      style = { display: "block" };
    }
    return (
      <FolderModelComponent
        style={style}
        handleClose={handleClose}
        handleChange={this.handleChange}
        handleSaveFolder={this.handleSaveFolder}
      />
    );
  }
}

export default FolderModel;