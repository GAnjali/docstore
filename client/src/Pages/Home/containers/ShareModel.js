import React, { Component } from "react";
import { addShare, getUserByEmail } from "../services/HomeService";
import ShareModelComponent from "../components/ShareModel";

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
      <ShareModelComponent
        style={style}
        handleClose={handleClose}
        handleShare={this.handleShare}
        handleChange={this.handleChange}
        handleShareType={this.handleShareType}
      />
    );
  }
}

export default ShareModel;