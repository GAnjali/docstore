import React, { Component } from "react";
import "../styles/Login.css";
import { login } from "../services/LoginService";
import LoginView from "../components/LoginView";
import { getToken, setToken, setUser } from "../../../Util/localStorageUtil";
import {
  HOME_URL,
  STATUS_CODE_200,
  TOKEN_GENERATED
} from "../../../AppConstants";

const intialState = {
  email: "",
  password: "",
  error: "",
  hasError: ""
};

class Login extends Component {
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

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    const response = await login(this.state.email, this.state.password);
    this.handleResponse(response, this.props.history);
  };

  handleResponse = (response, history) => {
    if (
      response.status === STATUS_CODE_200 &&
      response.data.message === TOKEN_GENERATED
    ) {
      setUser(this.state.email);
      setToken(response.data.data);
      history.replace(HOME_URL);
    } else {
      this.setState({
        hasError: true,
        error:
          response !== undefined && response.response !== undefined
            ? response.response.data.message
            : response.message
      });
    }
  };

  render() {
    return (
      <LoginView
        history={this.props.history}
        email={this.state.email}
        password={this.state.password}
        hasError={this.state.hasError}
        error={this.state.error}
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
      />
    );
  }
}

export default Login;
