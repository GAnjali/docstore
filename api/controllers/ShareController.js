import Util from "../utils/Util";
import ShareService from "../services/ShareService";

const util = new Util();

class ShareController {

    static async addShare(req, res) {
        try {
            const share = await ShareService.getShares(req.body.fileid, req.body.userid);
            if (share === null || share === undefined) {
                const newShare = await ShareService.add(req.body);
                util.setSuccess(201, 'Share Added!', newShare);
                return util.send(res);
            } else {
                const updateShare = await ShareService.update(req.body);
                util.setSuccess(200, 'Share Updated!', updateShare);
                return util.send(res);
            }
        } catch (error) {
            console.log(error);
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async getAllSharings(req, res) {
        try {
            const allSharings = await ShareService.getAll(req.params.id);
            if (allSharings.length > 0) {
                util.setSuccess(200, 'Sharings retrieved', allSharings);
            } else {
                util.setSuccess(200, 'No Shares found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ShareController;