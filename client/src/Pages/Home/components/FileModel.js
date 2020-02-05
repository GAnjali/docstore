import React, { Component } from "react";
import {
  FILE_CONTENT_PLACEHOLDER,
  FILE_NAME_PLACEHOLDER,
  SAVE
} from "../../../AppConstants";
import { updateFile } from "../services/FileService";

class FileModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingFile: props.editingFile
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ editingFile: props.editingFile });
  }

  handleTitleChange = event => {
    const newTitle = event.target.value;
    this.setState(prevState => {
      const fileOnEdit = prevState.editingFile;
      fileOnEdit.name = newTitle;
      return { editingFile: fileOnEdit };
    });
  };

  handleContentChange = event => {
    const newContent = event.target.value;
    this.setState(prevState => {
      const fileOnEdit = prevState.editingFile;
      fileOnEdit.content = newContent;
      return { editingFile: fileOnEdit };
    });
  };

  handleSaveFile = async () => {
    if (this.props.showModel) {
      await updateFile(this.state.editingFile).then(() => {
        this.props.handleClose();
        this.props.updateComponent(localStorage.getItem("parentfolderid"));
      });
    }
  };

  render() {
    let style = {},
      title = "",
      content = "";

    if (this.props.showModel) {
      style = { display: "block" };
      title =
        this.state.editingFile.name != null
          ? this.state.editingFile.name
          : title;
      content =
        this.state.editingFile.content != null
          ? this.state.editingFile.content
          : title;
    }

    return (
      <div id="myModal" className="modal" style={style}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.props.handleClose}>
              &times;
            </span>
            <textarea
              className={"model-title"}
              value={title}
              placeholder={FILE_NAME_PLACEHOLDER}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="modal-body">
            <textarea
              className={"model-filecontent"}
              value={content}
              onChange={this.handleContentChange}
              placeholder={FILE_CONTENT_PLACEHOLDER}
            />
          </div>
          <div className="modal-save">
            <button onClick={this.handleSaveFile}>{SAVE}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileModel;
