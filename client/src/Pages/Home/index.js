import React, {Component} from "react";
import Header from "./Header";
import './Home.css';
import Sidebar from "./Sidebar";
import {deleteFile, getFileByid, getFiles, getFolders, updateFile, getUserByEmail, addShare, addFile} from "./HomeService";
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
        sharingFile: null,
        sharingWith: null,
        shareType: 'View'
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
        if (event.target.id) {
            if (event.target.className === "file-content") {
                const response = await getFileByid(this.state.files[event.target.id].id);
                if (response.status === 200 && response.data.data !== undefined) {
                    this.setState({
                        editingFile: response.data.data,
                        showFileModel: true
                    })
                }
            } else if (event.target.className === "file-delete") {
                const deleteResponse = await deleteFile(this.state.files[event.target.id].id);
                if (deleteResponse.status === 200) {
                    alert(deleteResponse.data.message);
                }
            } else if (event.target.className === "file-share") {
                console.log(event.target.id);
                this.setState({
                    showSharingModel: true,
                    sharingFile: this.state.files[event.target.id]
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

    handleInput = (event) => {
        this.setState({
            sharingWith: event.target.value
        })
    };

    handleShareType = (event) => {
        this.setState({
            shareType: event.target.id
        })
    };

    handleShare = async () => {
        const getUserResponse = await getUserByEmail(this.state.sharingWith);
        if (getUserResponse.status === 200) {
            const shareResponse = await addShare(this.state.sharingFile.id, this.state.shareType, getUserResponse.data.data.id);
            if (shareResponse.status === 200) {
                alert(shareResponse.data.message);
            } else {
                this.setState({
                    error: getUserResponse.message
                })
            }
        } else {
            this.setState({
                error: getUserResponse.message
            })
        }
    };

    handleAddFile =() =>{
        const newFile = {
            name: '',
            content: ''
        }
        this.setState({
            showFileModel: true,
            editingFile: newFile
        })
    };

    render() {
        return (
            <>
                <Header/>
                <Sidebar handleAddFile={this.handleAddFile}/>
                <MainSection folders={this.state.folders} files={this.state.files}
                             handleFileClick={this.handleFileClick}/>
                <FileModel editingFile={this.state.editingFile} show={this.state.showFileModel}
                           handleContentChange={this.handleContentChange} handleSave={this.handleSave}
                           handleClose={this.handleClose}/>
                <ShareModel show={this.state.showSharingModel} sharingFile={this.state.sharingFile}
                            handleInput={this.handleInput} handleShareType={this.handleShareType}
                            handleShare={this.handleShare}/>
            </>
        )
    }
}

export default Home;