import FileService from "../services/FileService";
import Util from "../utils/Util";
import uuidv4 from 'uuid/v4';

const util = new Util();

class FileController {

    static async getAllFiles(req, res) {
        try {
            const allFiles = await FileService.getAllFiles();
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
        if (!req.body.name) {
            util.setError(400, 'Cannot create a File without Name, Please provide file name');
            return util.send(res);
        }
        const newFile = [uuidv4(), req.body.name, req.body.content];
        try {
            const createdFile = await FileService.addFile(newFile);
            util.setSuccess(201, 'File Added!', newFile);
            return util.send(res);
        } catch (error) {
            if((error.message).includes("duplicate key value violates unique constraint"))
                util.setError(400, "Cannot create a File with Duplicate name, Please provide unique file name");
            else util.setError(400, error.message);
            return util.send(res);
        }
    }
}

export default FileController;