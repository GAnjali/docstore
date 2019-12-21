import ResponseUtil from "../utils/ResponseUtil";
import ShareService from "../services/ShareService";

const responseUtil = new ResponseUtil();

class ShareController {
  static async add(req, res) {
    try {
      const existedShare = await ShareService.getAllByFileUser(
        req.body.fileid,
        req.body.userid
      );
      if (existedShare.length === 0) {
        const newShare = await ShareService.add(req.body);
        responseUtil.setSuccess(201, "Share Added!", newShare);
        return responseUtil.send(res);
      } else {
        const updateShare = await ShareService.update(req.body);
        responseUtil.setSuccess(200, "Share Updated!", updateShare);
        return responseUtil.send(res);
      }
    } catch (error) {
      responseUtil.setError(400, error.message);
      return responseUtil.send(res);
    }
  }

  static async getAllByUser(req, res) {
    try {
      const allSharings = await ShareService.getAllByUser(req.params.userid);
      if (allSharings.length > 0) {
        responseUtil.setSuccess(200, "Sharings retrieved", allSharings);
      } else {
        responseUtil.setSuccess(200, "No Shares found");
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async getAllByFileUser(req, res) {
    try {
      const sharing = await ShareService.getAllByFileUser(
        req.params.fileid,
        req.params.userid
      );
      if (sharing.length > 0) {
        responseUtil.setSuccess(200, "Sharing retrieved", sharing);
      } else {
        responseUtil.setSuccess(200, "No Share found");
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }
}

export default ShareController;