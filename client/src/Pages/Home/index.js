import React, {Component} from "react";
import {getToken} from "../../Util/localStorageUtil";
import decode from "jwt-decode";
import Header from "./Header";
import './Home.css';

class Home extends Component {

    state = {
        folders: []
    };

    componentDidMount() {
        if (!this.isLoggedIn()) {
            this.props.history.replace('/login')
        }
    }

    isLoggedIn = () => {
        const token = getToken();
        return !!token && !this.isTokenExpired(token)
    };

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    };

    render() {
        if (this.state.folders) {
            return (
                <Header />
            )
        }
    }
}

export default Home;