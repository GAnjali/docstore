import React from "react";
import "../styles/Home.css";
import { FILE, FOLDER, MY_STORE, NEW } from "../../../AppConstants";

const Sidebar = props => {
  const { handleAddFile, handleAddFolder } = props;
  return (
    <div className={"sidebar-block"}>
      <div className="newoptions">
        <button className="new-button">{NEW}</button>
        <div className="newoptions-content">
          <a className={"newfile"} onClick={handleAddFile}>
            {FILE}
          </a>
          <a className={"newfolder"} onClick={handleAddFolder}>
            {FOLDER}
          </a>
        </div>
      </div>
      <div className={"sidebar-tabs"}>
        <p>{MY_STORE}</p>
      </div>
    </div>
  );
};


export default Sidebar;