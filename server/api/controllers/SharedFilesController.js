import ResponseUtil from "../utils/ResponseUtil";
import SharedFilesService from "../services/SharedFilesService";

const responseUtil = new ResponseUtil();

class SharedFilesController {
  static async getSharedFiles(req, res) {
    try {
      const sharedFiles = await SharedFilesService.getSharedFiles(
        req.params.userid
      );
      responseUtil.setSuccess(200, "Shared Files retrieved!", sharedFiles);
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }
}

export default SharedFilesController;