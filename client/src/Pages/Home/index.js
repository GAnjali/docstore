import React, {Component} from "react";
import Header from "./Header";
import './Home.css';
import Sidebar from "./Sidebar";
import {deleteFile, getFileByid, getFiles, getFolders, updateFile} from "./HomeService";
import MainSection from "./MainSection";
import {isLoggedIn} from "../../Util/AuthService";
import FileModel from "./FileModel";
import ShareModel from "./ShareModel";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        folders: [],
        files: [],
        error: '',
        editingFile: null,
        showFileModel: false,
        showSharingModel: false,
        sharingFile: null
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

    handleFileClick = async (event) => {
        if(event.target.id){
            if(event.target.className==="file-content"){
                const response = await getFileByid(this.state.files[event.target.id].id);
                if (response.status === 200 && response.data.data !== undefined) {
                    this.setState({
                        editingFile: response.data.data,
                        showFileModel: true
                    })
                }
            }
            else if(event.target.className==="file-delete"){
                const deleteResponse = await deleteFile(this.state.files[event.target.id].id);
                if (deleteResponse.status === 200){
                    alert(deleteResponse.data.message);
                }
            }
            else if(event.target.className==="file-share"){
                console.log(event.target.id);
                this.setState({
                    showSharingModel: true,
                })
            }
        }

    };

    handleContentChange = (e) => {
        const newContent = e.target.value;
        this.setState((prevState) => {
            const fileOnEdit = prevState.editingFile;
            fileOnEdit.content = newContent;
            return {editingFile: fileOnEdit};
        });
    };

    handleSave = async () => {
        if (this.state.showFileModel) {
            await updateFile(this.state.editingFile).then(() => {
                this.setState({
                    showFileModel: false,
                });
            });
        }
        // else saveFile(this.state.editingNote);

    };

    handleClose = () => {
        this.setState({
            showFileModel: false,
        });
    };

    render() {
        return (
            <>
                <Header/>
                <Sidebar/>
                <MainSection folders={this.state.folders} files={this.state.files}
                             handleFileClick={this.handleFileClick}/>
                <FileModel editingFile={this.state.editingFile} show={this.state.showFileModel}
                           handleContentChange={this.handleContentChange} handleSave={this.handleSave}
                           handleClose={this.handleClose}/>
                <ShareModel show={this.state.showSharingModel} sharingFile={this.state.sharingFile}/>
            </>
        )
    }
}

export default Home;