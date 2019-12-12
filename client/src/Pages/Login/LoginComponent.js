import React, {Component} from 'react';
import './Login.css';
import login from "./APIservice";
import LoginView from "./LoginView";

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        hasError: '',
    };

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await login(this.state.username, this.state.password);
        this.handleResponse(response);
    };

    handleResponse = (response) => {
        if (response.status === 200 && response.data.message === "Token generated") {
            this.props.history.replace('/');
            localStorage.setItem("token", response.data.data);
        } else {
            this.setState({
                hasError: true,
                error: response.toString()
            })
        }
    };

    render() {
        return (
            <LoginView email={this.state.email}
                       password={this.state.password}
                       hasError={this.state.hasError}
                       error={this.state.error}
                       handleChange={this.handleChange}
                       handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

export default Login;
