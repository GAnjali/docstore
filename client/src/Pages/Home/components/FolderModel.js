import React, { Component } from "react";
import {
  FOLDER_NAME_PLACEHOLDER,
  NEW_FOLDER,
  SAVE
} from "../../../AppConstants";
import { addFolder } from "../services/FolderService";

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
      <div id="myModal" className="sharingmodal" style={style}>
        <div className="foldermodal-content">
          <div className="modal-header">
            <span className={"newFolder"}>{NEW_FOLDER}</span>
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <textarea
              className={"sharingwith-text-area"}
              name={"newFolderName"}
              placeholder={FOLDER_NAME_PLACEHOLDER}
              onChange={this.handleChange}
            />
            <div className="modal-save">
              <button onClick={this.handleSaveFolder}>{SAVE}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FolderModel;