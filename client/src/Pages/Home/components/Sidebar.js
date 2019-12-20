import React from "react";
import '../styles/Home.css'

const Sidebar = (props) => {
    return (
        <div className={"sidebar-block"}>
            <div className="newoptions">
                <button className="new-button">+ New</button>
                <div className="newoptions-content">
                    <a className={"newfile"} onClick={props.handleAddFile}>File</a>
                    <a className={"newfolder"} onClick={props.handleAddFolder}>Folder</a>
                </div>
            </div>
            <div className={"sidebar-tabs"}>
                <p>My Store</p>
            </div>

        </div>
    )
};

export default Sidebar;