import FileService from "../services/FileService";
import ResponseUtil from "../utils/ResponseUtil";
import FolderService from "../services/FolderService";

const util = new ResponseUtil();

class FileController {

    static async getAllFiles(req, res) {
        try {
            const allFiles = await FileService.getAllFiles(req.user.id);
            if (allFiles.length > 0) {
                util.setSuccess(200, 'Files retrieved', allFiles);
            } else {
                util.setSuccess(200, 'No file found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addFile(req, res) {
        const newFile = {
            name: req.body.name,
            content: req.body.content,
            parentfolderid: null,
            userid: req.user.id
        };
        try {
            if (req.body.parentfoldername !== undefined) {
                const parentfolder = await FolderService.getAFolderByName(req.body.parentfoldername);
                if (parentfolder)
                    newFile.parentfolderid = parentfolder.id;
            }
            const createdFile = await FileService.addFile(newFile);
            util.setSuccess(201, 'File Added!', createdFile);
            return util.send(res);
        } catch (error) {
            if ((error.message).includes("duplicate key value violates unique constraint"))
                util.setError(400, "Cannot create a File with Duplicate name, Please provide unique file name");
            else util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async getAFile(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const theFile = await FileService.getAFile(id);

            if (!theFile) {
                util.setError(404, `Cannot find file with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found File!', theFile);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async updateFile(req, res) {
        const updateData = req.body;
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateFile = await FileService.update(id, updateData);
            if (!updateFile) {
                util.setError(404, `Cannot find file with the id: ${id}`);
            } else {
                util.setSuccess(200, 'File updated', updateFile);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteFile(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const fileToDelete = await FileService.deleteFile(id);
            if (fileToDelete) {
                util.setSuccess(200, 'File deleted');
            } else {
                util.setError(404, `File with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default FileController;