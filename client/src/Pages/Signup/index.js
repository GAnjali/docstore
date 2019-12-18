import React, {Component} from 'react';
import '../Login/Login.css';
import register from "./APIService";
import SignupView from "./SignupView";
import {getToken} from "../../Util/localStorageUtil";

class Index extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        hasError: '',
    };

    componentDidMount() {
        if (getToken().length != 0) {
            this.props.history.replace('/')
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await register(this.state.username, this.state.password);
        this.handleResponse(response);
    };

    handleResponse = (response) => {
        if (response.status === 201 && response.data.message === "User Added!") {
            this.props.history.replace('/login');
        } else {
            this.setState({
                hasError: true,
                error: response.toString()
            })
        }
    };

    render() {
        return (
            <SignupView email={this.state.email}
                        password={this.state.password}
                        hasError={this.state.hasError}
                        error={this.state.error}
                        handleChange={this.handleChange}
                        handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

export default Index;
