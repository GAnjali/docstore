import {
  EDIT,
  EMAIL_PLACEHOLDER,
  PEOPLE,
  SHARE,
  SHARE_TYPE,
  SHARE_WITH_OTHERS,
  VIEW
} from "../../../AppConstants";
import React from "react";

const ShareModelComponent = props => {
  return (
    <div id="myModal" className="sharingmodal" style={props.style}>
      <div className="sharingmodal-content">
        <span className="close" onClick={props.handleClose}>
          &times;
        </span>
        <span className={"sharingmodel-heading"}> {SHARE_WITH_OTHERS} </span>
        <span className={"people-span"}> {PEOPLE} </span>
        <div className={"sharingmodel-body"}>
          <textarea
            className={"sharewith-textarea"}
            name={"sharingWithUser"}
            placeholder={EMAIL_PLACEHOLDER}
            onChange={props.handleChange}
          />
          <div className="sharetype-dropdown">
            <button className="dropbtn">{SHARE_TYPE}</button>
            <div className="dropdown-content">
              <p onClick={props.handleShareType} id={"View"}>
                {VIEW}
              </p>
              <p onClick={props.handleShareType} id={"Modify"}>
                {EDIT}
              </p>
            </div>
          </div>
        </div>
        <button className={"share-button"} onClick={props.handleShare}>
          {SHARE}
        </button>
      </div>
    </div>
  );
};

export default ShareModelComponent;