import FileService from "../services/FileService";
import Util from "../utils/Util";

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
}

export default FileController;