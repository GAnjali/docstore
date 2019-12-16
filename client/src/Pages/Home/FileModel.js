import React from "react";

const FileModel = (props) => {
    let style = {}, title = '', content = '';
    if (props.show === true) {
        style = {display: "block"};
        title = props.editingFile.name;
        content = props.editingFile.content
    }
    return (
        <div id="myModal" className="modal" style={style}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <h2 className={"model-title"}>{title}</h2>
                </div>
                <div className="modal-body">
                    <textarea className={"model-filecontent"} value={content} onChange={props.handleContentChange}/>
                </div>
                <div className="modal-footer">
                    <button onClick={props.handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default FileModel;