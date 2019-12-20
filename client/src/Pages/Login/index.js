import React, {Component} from 'react';
import './Login.css';
import {login} from "./LoginService";
import LoginView from "./LoginView";
import {getToken, setToken, setUser} from "../../Util/localStorageUtil";

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        hasError: '',
    };

    componentDidMount() {
        if(getToken().length !== 0){
            this.props.history.replace('/dashboard')
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await login(this.state.username, this.state.password);
        this.handleResponse(response, this.props.history);
    };


    handleResponse = (response, history) => {
        if (response.status === 200 && response.data.message === "Token generated") {
            setUser(this.state.email);
            setToken(response.data.data);
            history.replace('/dashboard');
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
