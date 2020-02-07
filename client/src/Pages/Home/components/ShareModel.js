import React, { Component } from "react";
import {
  EDIT,
  EMAIL_PLACEHOLDER,
  PEOPLE,
  SHARE,
  SHARE_TYPE,
  SHARE_WITH_OTHERS,
  VIEW
} from "../../../AppConstants";

class ShareModel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleClose,
      handleInput,
      handleShareType,
      handleShare
    } = this.props;
    let style = {};
    if (this.props.show === true) {
      style = { display: "block" };
    }
    return (
      <div id="myModal" className="sharingmodal" style={style}>
        <div className="sharingmodal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <span className={"sharingmodel-heading"}> {SHARE_WITH_OTHERS} </span>
          <span className={"people-span"}> {PEOPLE} </span>
          <div className={"sharingmodel-body"}>
            <textarea
              className={"sharewith-textarea"}
              name={"sharingWithUser"}
              placeholder={EMAIL_PLACEHOLDER}
              onChange={handleInput}
            />
            <div className="sharetype-dropdown">
              <button className="dropbtn">{SHARE_TYPE}</button>
              <div className="dropdown-content">
                <p onClick={handleShareType} id={"View"}>
                  {VIEW}
                </p>
                <p onClick={handleShareType} id={"Modify"}>
                  {EDIT}
                </p>
              </div>
            </div>
          </div>
          <button className={"share-button"} onClick={handleShare}>
            {SHARE}
          </button>
        </div>
      </div>
    );
  }
}

export default ShareModel;
