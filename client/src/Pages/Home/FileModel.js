import React from "react";

const FileModel = (props) => {
    let style = {}, title = '', content = '';
    if (props.show === true) {
        style = {display: "block"};
        title = props.editingFile.name != null ? props.editingFile.name : '';
        content = props.editingFile.content != null ? props.editingFile.content : ''
    }
    return (
        <div id="myModal" className="modal" style={style}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <textarea className={"model-title"} value={title} placeholder={"Enter file name here..."} onChange={props.handleTitleChange}/>
                </div>
                <div className="modal-body">
                    <textarea className={"model-filecontent"} value={content} onChange={props.handleContentChange}
                              placeholder={"File content..."}/>
                </div>
                <div className="modal-footer">
                    <button onClick={props.handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default FileModel;