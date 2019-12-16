import React, {Component} from "react";
import Header from "./Header";
import './Home.css';
import Sidebar from "./Sidebar";
import {getFiles, getFolders} from "./HomeService";
import MainSection from "./MainSection";
import {isLoggedIn} from "../../Util/AuthService";

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
        if (!isLoggedIn()) {
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

    render() {
        return (
            <>
                <Header/>
                <Sidebar/>
                <MainSection folders={this.state.folders} files={this.state.files}/>
            </>
        )
    }
}

export default Home;