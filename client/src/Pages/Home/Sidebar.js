import React from "react";
import './Home.css'

const Sidebar = (props) => {
    return (
        <div className={"sidebar-block"}>
            <div className={"sidebar-tabs"}>
                <p>My Store</p>
            </div>
            <div className="new-options">
                <button className="new-button">+ New</button>
                <div className="newoptions-content">
                    <button className={"newfile"} onClick={props.handleAddFile}>New File</button>
                    <button className={"newfolder"} onClick={props.handleAddFolder}>New Folder</button>
                </div>
            </div>

        </div>
    )
};

export default Sidebar;