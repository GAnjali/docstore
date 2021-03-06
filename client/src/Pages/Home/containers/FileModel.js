import React, { Component } from "react";
import { addFile, updateFile } from "../services/FileService";
import FileModelComponent from "../components/FileModel";

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
      if (this.props.isNewFile) {
        await addFile(this.state.editingFile).then(() => {
          this.props.handleClose();
          this.props.updateComponent(localStorage.getItem("parentfolderid"));
        });
      } else {
        await updateFile(this.state.editingFile).then(() => {
          this.props.handleClose();
          this.props.updateComponent(localStorage.getItem("parentfolderid"));
        });
      }
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
      <FileModelComponent
        style={style}
        handleClose={this.props.handleClose}
        title={title}
        handleTitleChange={this.handleTitleChange}
        content={content}
        handleContentChange={this.handleContentChange}
        handleSaveFile={this.handleSaveFile}
      />
    );
  }
}

export default FileModel;
