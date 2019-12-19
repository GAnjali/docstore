import ResponseUtil from "../utils/ResponseUtil";
import ShareService from "../services/ShareService";

const util = new ResponseUtil();

class ShareController {

    static async add(req, res) {
        try {
            const existedShare = await ShareService.getAllByFileUser(req.body.fileid, req.body.userid);
            if (existedShare.length === 0) {
                const newShare = await ShareService.add(req.body);
                util.setSuccess(201, 'Share Added!', newShare);
                return util.send(res);
            } else {
                const updateShare = await ShareService.update(req.body);
                util.setSuccess(200, 'Share Updated!', updateShare);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async getAllByUser(req, res) {
        try {
            const allSharings = await ShareService.getAllByUser(req.params.userid);
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