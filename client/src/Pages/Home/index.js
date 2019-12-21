import React, {Component} from "react";
import Header from "./components/Header";
import './styles/Home.css';
import Sidebar from "./components/Sidebar";
import {deleteFile, getFileByid, getFiles, updateFile, addFile, getSharedFiles} from "./services/FileService";
import {addFolder, deleteFolder, getFolders} from "./services/FolderService";
import {getUserByEmail, addShare} from "./services/HomeService";
import MainSection from "./components/MainSection";
import {isLoggedIn} from "../../Util/AuthService";
import FileModel from "./components/FileModel";
import ShareModel from "./components/ShareModel";
import FolderModel from "./components/FolderModel";
import ResponseUtil from "../../Util/ResponseUtil";
import {getUser} from "../../Util/localStorageUtil";

const responseUtil = new ResponseUtil();

class Home extends Component {

    state = {
        folders: [],
        files: [],
        error: '',
        editingFile: null,
        showFileModel: false,
        showSharingModel: false,
        showFolderModel: false,
        sharingFile: null,
        sharingWithUser: null,
        shareType: 'View',
        newFile: false,
        newFolderName: ''
    };

    componentDidMount() {
        localStorage.setItem("parentfolderid", 0);
        if (!isLoggedIn()) {
            this.props.history.replace('/login')
        } else {
            this.updateComponent(0);
        }
    }

    updateComponent = (parentfolderid) => {
        this.getFiles(parentfolderid);
        this.getFolders(parentfolderid);
    };

    getFiles = async (parentfolderid) => {
        const getFilesResponse = responseUtil.getResponse(await getFiles(parentfolderid));
        if (getFilesResponse.status === 'success') {
            this.setState({
                files: getFilesResponse.data
            })
        } else {
            this.setState({
                error: getFilesResponse.message
            })
        }
        const getSHaredFilesResponse = responseUtil.getResponse(await getSharedFiles(this.getUserId()));
        if (getSHaredFilesResponse.status === 'success') {
            const allFiles = this.state.files;
            getSHaredFilesResponse.data.map((file) => {
                allFiles.push(file);
            });
            this.setState({
                files: allFiles
            })
        } else {
            this.setState({
                error: getSHaredFilesResponse
            })
        }
    };

    getFolders = async (parentFolderId) => {
        const getFoldersResponse = responseUtil.getResponse(await getFolders(parentFolderId));
        if (getFoldersResponse.status === 'success') {
            this.setState({
                folders: getFoldersResponse.data
            })
        } else {
            this.setState({
                error: getFoldersResponse.message
            })
        }
    };

    getUserId = async () => {
        const getUserResponse = responseUtil.getResponse(await getUserByEmail(getUser()));
        if (getUserResponse.status === 'success') {
            return getUserResponse.data.id
        } else {
            this.setState({
                error: getUserResponse.message
            })
        }
    };

    handleFileActions = async (event) => {
        if (event.target.id !== undefined) {
            if (event.target.className === "file-content")
                this.handleEditFile(this.state.files[event.target.id].id);
            else if (event.target.className === "file-delete") {
                this.handleDeleteFile(this.state.files[event.target.id].id);
            } else if (event.target.className === "file-share") {
                this.handleShareFile(event.target.id);
            }
        }
    };

    handleEditFile = async (fileid) => {
        const getFileByIdResponse = responseUtil.getResponse(await getFileByid(fileid));
        if (getFileByIdResponse.status === 'success') {
            this.setState({
                editingFile: getFileByIdResponse.data,
                showFileModel: true
            })
        } else {
            this.setState({
                error: getFileByIdResponse.message
            })
        }
    };

    handleSaveFile = async () => {
        if (this.state.showFileModel) {
            if (!this.state.newFile) {
                await updateFile(this.state.editingFile).then(() => {
                    this.setState({
                        showFileModel: false,
                    });
                    this.updateComponent(localStorage.getItem("parentfolderid"));
                });
            }
            await addFile(this.state.editingFile).then(() => {
                this.setState({
                    showFileModel: false,
                    newFile: false
                }, () => {
                    this.updateComponent(localStorage.getItem("parentfolderid"));
                });
            });
        }
    };

    handleAddNewFile = () => {
        const newFile = {
            name: '',
            content: '',
            parentfoldername: localStorage.getItem("parentfoldername")
        };
        this.setState({
            showFileModel: true,
            editingFile: newFile,
            newFile: true
        })
    };

    handleDeleteFile = async (fileid) => {
        const deleteResponse = await deleteFile(fileid);
        if (deleteResponse.status === 200) {
            this.updateComponent(localStorage.getItem("parentfolderid"));
        } else {
            this.setState({
                error: deleteResponse.message
            })
        }
    };

    handleShareFile = (fileindex) => {
        this.setState({
            showSharingModel: true,
            sharingFile: this.state.files[fileindex]
        })
        //share service request
    };

    handleFolderActions = async (event) => {
        if (event.target.className === 'folder-delete') {
            this.handleDeleteFolder(this.state.folders[event.target.id].id);
        } else if (event.target.className !== 'folder-share') {
            localStorage.setItem("parentfolderid", this.state.folders[event.target.id].id);
            localStorage.setItem("parentfoldername", this.state.folders[event.target.id].name);
            this.updateComponent(this.state.folders[event.target.id].id);
        }
    };

    handleDeleteFolder = async (folderid) => {
        const deleteFolderResponse = await deleteFolder(folderid);
        if (deleteFolderResponse.status === 200) {
            this.updateComponent(localStorage.getItem("parentfolderid"));
        } else {
            this.setState({
                error: deleteFolderResponse.message
            })
        }
    };

    handleSaveFolder = async () => {
        const newFolder = {name: this.state.newFolderName};
        await addFolder(newFolder).then(() => {
            this.setState({
                showFolderModel: false
            });
            this.updateComponent(localStorage.getItem("parentfolderid"));
        }).catch((err) => {
            this.setState({
                error: err.message
            })
        })
    };

    handleAddNewFolder = () => {
        this.setState({
            showFolderModel: true
        })
    };

    handleContentChange = (event) => {
        const newContent = event.target.value;
        this.setState((prevState) => {
            const fileOnEdit = prevState.editingFile;
            fileOnEdit.content = newContent;
            return {editingFile: fileOnEdit};
        });
    };

    handleTitleChange = (event) => {
        const newTitle = event.target.value;
        this.setState((prevState) => {
            const fileOnEdit = prevState.editingFile;
            fileOnEdit.name = newTitle;
            return {editingFile: fileOnEdit};
        });
    };

    handleClose = () => {
        this.setState({
            showFileModel: false,
            showFolderModel: false,
            showSharingModel: false
        });
    };

    handleShare = async () => {
        const getUserResponse = await getUserByEmail(this.state.sharingWithUser);
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

    handleShareType = (event) => {
        this.setState({
            shareType: event.target.id
        })
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        })
    };

    logOut = (props) => {
        console.log(props);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.props.history.replace('/login');
    };

    render() {
        return (
            <>
                <Header/>
                <button className={"logout"} onClick={this.logOut}>Logout</button>
                <Sidebar handleAddFile={this.handleAddNewFile} handleAddFolder={this.handleAddNewFolder}/>
                <MainSection folders={this.state.folders} files={this.state.files}
                             handleFileClick={this.handleFileActions} handleFolderClick={this.handleFolderActions}/>
                <FolderModel show={this.state.showFolderModel} newFolder={this.state.newFolderName}
                             handleFolderNameChange={this.handleChange}
                             handleSaveFolder={this.handleSaveFolder} handleClose={this.handleClose}/>
                <FileModel editingFile={this.state.editingFile} show={this.state.showFileModel}
                           handleTitleChange={this.handleTitleChange}
                           handleContentChange={this.handleContentChange} handleSaveFile={this.handleSaveFile}
                           handleClose={this.handleClose}/>
                <ShareModel show={this.state.showSharingModel} sharingFile={this.state.sharingFile}
                            handleInput={this.handleChange} handleShareType={this.handleShareType}
                            handleShare={this.handleShare} handleClose={this.handleClose}/>
            </>
        )
    }
}

export default Home;