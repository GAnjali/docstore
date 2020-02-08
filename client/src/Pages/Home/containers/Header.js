import React, { Component } from "react";
import "../styles/Home.css";
import { LOGIN_URL } from "../../../AppConstants";
import { removeToken, removeUser } from "../../../Util/localStorageUtil";
import HeaderComponent from "../components/Header";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    removeToken();
    removeUser();
    this.props.history.replace(LOGIN_URL);
  };

  render() {
    return <HeaderComponent logout={this.logout} />;
  }
}

export default Header;