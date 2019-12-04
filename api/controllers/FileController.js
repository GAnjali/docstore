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
        if (!req.body.name || !req.body.content) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newFile = [uuidv4(), req.body.name, req.body.content];
        console.log(newFile);
        try {
            const createdFile = await FileService.addFile(newFile);
            util.setSuccess(201, 'File Added!', newFile);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async getAFile(req, res) {
        const {id} = req.params;
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