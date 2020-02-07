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
import { addShare, getUserByEmail } from "../services/HomeService";

class ShareModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharingWithUser: null,
      error: "",
      shareType: "View",
      sharingFile: props.sharingFile
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ sharingFile: props.sharingFile });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleShareType = event => {
    this.setState({
      shareType: event.target.id
    });
  };

  handleShare = async () => {
    const getUserResponse = await getUserByEmail(this.state.sharingWithUser);
    if (getUserResponse.status === 200) {
      const shareResponse = await addShare(
        this.state.sharingFile.id,
        this.state.shareType,
        getUserResponse.data.data.id
      );
      if (shareResponse.status === 200) {
        this.props.handleClose();
      } else {
        this.setState({
          error: getUserResponse.message
        });
      }
    } else {
      this.setState({
        error: getUserResponse.message
      });
    }
  };

  render() {
    const { handleClose } = this.props;
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
              onChange={this.handleChange}
            />
            <div className="sharetype-dropdown">
              <button className="dropbtn">{SHARE_TYPE}</button>
              <div className="dropdown-content">
                <p onClick={this.handleShareType} id={"View"}>
                  {VIEW}
                </p>
                <p onClick={this.handleShareType} id={"Modify"}>
                  {EDIT}
                </p>
              </div>
            </div>
          </div>
          <button className={"share-button"} onClick={this.handleShare}>
            {SHARE}
          </button>
        </div>
      </div>
    );
  }
}

export default ShareModel;
