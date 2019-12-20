import React from "react";

const FolderModel = (props) => {
    let style = {};
    if (props.show === true) {
        style = {display: "block"};
    }
    return (
        <div id="myModal" className="sharingmodal" style={style}>
            <div className="foldermodal-content">
                <div className="modal-header">
                    <span className="close" onClick={props.handleClose}>&times;</span>
                    <textarea className={"sharingwith-text-area"} name={"newFolderName"}
                              placeholder={"Enter folder name here..."} onChange={props.handleFolderNameChange}/>
                    <div className="modal-footer">
                        <button onClick={props.handleSaveFolder}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FolderModel;