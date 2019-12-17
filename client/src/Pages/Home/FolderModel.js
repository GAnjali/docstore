import React from "react";

const FolderModel = (props) => {
    let style = {}, title = '', content = '';
    if (props.show === true) {
        style = {display: "block"};
    }
    return (
        <div id="myModal" className="sharingmodal" style={style}>
            <div className="sharingmodal-content">
                <div className={"sharingmodel-body"}>
                    <textarea className={"sharewith-textarea"} placeholder={"Enter folder name here..."} onChange={props.handleFolderNameChange}/>
                </div>
                <button className={"share-button"} onClick={props.handleSaveFolder}>Save</button>
            </div>
        </div>
    )
};

export default FolderModel;