import React, {Component} from "react";
import {getToken} from "../../Util/localStorageUtil";
import decode from "jwt-decode";
import Header from "./Header";
import './Home.css';
import Sidebar from "./Sidebar";
import {getFiles, getFolders} from "./HomeService";
import MainSection from "./MainSection";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        folders: [],
        files: [],
        error: ''
    };

    componentDidMount() {
        if (!this.isLoggedIn()) {
            this.props.history.replace('/login')
        } else {
            this.fetchDocs('Folders', 0);
            this.fetchDocs('Files', 0);
        }
    }

    fetchDocs = async (docType, parentFolderId) => {
        const docsResponse = (docType === 'Folders') ? await getFolders(parentFolderId) : await getFiles(parentFolderId);
        if (docsResponse.status === 200) {
            if (docType === 'Folders' && docsResponse.data.data !== undefined) {
                this.setState({
                    folders: docsResponse.data.data
                });
            } else {
                if (docsResponse.data.data !== undefined) {
                    this.setState({
                        files: docsResponse.data.data
                    });
                }
            }
        } else {
            this.setState({
                error: docsResponse.message
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
        return (
            <>
                <Header/>
                <Sidebar/>
                <MainSection folders={this.state.folders}/>
            </>
        )
    }
}

export default Home;