import React, { Component } from "react";
import "../Login/Login.css";
import register from "./SignupService";
import SignupView from "./SignupView";
import { getToken } from "../../Util/localStorageUtil";
import {
  HOME_URL,
  LOGIN_URL,
  USER_ADDED,
  STATUS_CODE_201
} from "../../AppConstants";

const intialState = {
  email: "",
  password: "",
  error: "",
  hasError: ""
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }

  componentDidMount() {
    const token = getToken();
    if (token !== null && token !== undefined && token.length !== 0) {
      this.props.history.replace(HOME_URL);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSignup = async e => {
    e.preventDefault();
    const response = await register(this.state.email, this.state.password);
    this.handleResponse(response);
  };

  handleResponse = response => {
    if (
      response.status === STATUS_CODE_201 &&
      response.data.message === USER_ADDED
    ) {
      this.props.history.replace(LOGIN_URL);
    } else {
      this.setState({
        hasError: true,
        error: (response.response!==undefined)?response.response.data.message():response.message
      });
    }
  };

  render() {
    return (
      <SignupView
        email={this.state.email}
        password={this.state.password}
        hasError={this.state.hasError}
        error={this.state.error}
        handleChange={this.handleChange}
        handleFormSignup={this.handleFormSignup}
      />
    );
  }
}

export default Index;
