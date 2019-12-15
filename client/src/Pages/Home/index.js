import React, {Component} from "react";
import {getToken} from "../../Util/localStorageUtil";
import decode from "jwt-decode";
import Header from "./Header";
import './Home.css';
import Sidebar from "./Sidebar";
import {getFolders} from "./HomeService";
import MainSection from "./MainSection";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        folders: [],
        error: ''
    };

    componentDidMount() {
        if (!this.isLoggedIn()) {
            this.props.history.replace('/login')
        } else this.fetchDocs();
    }

    fetchDocs = async () => {
        const foldersResponse = await getFolders(0);
        if (foldersResponse.status === 200) {
            this.setState({
                folders: foldersResponse.data.data
            })
        } else {
            this.setState({
                error: foldersResponse.message
            })
        }
    };

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
                <>
                    <Header/>
                    <Sidebar/>
                    <MainSection folders={this.state.folders}/>
                </>
            )
        }
    }
}

export default Home;