import ResponseUtil from "../utils/ResponseUtil";
import SharedFilesService from "../services/SharedFilesService";

const util = new ResponseUtil();

class SharedFilesController {

    static async getSharedFiles(req, res) {
        console.log(" SharedFiles Controller");
        try {
            const sharedFiles = await SharedFilesService.getSharedFiles(req.params.userid);
            console.log("controller:",sharedFiles);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default SharedFilesController;