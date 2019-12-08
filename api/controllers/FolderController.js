import Util from "../utils/Util";
import FolderService from "../services/FolderService";

const util = new Util();

class FolderController {

    static async create(req, res) {
        const newFolder = {
            name: req.body.name,
            parentfolderid: null,
            userid: req.user.id
        };
        try {
            if (req.body.parentfoldername !== undefined) {
                const parentfolder = await FolderService.getOne(req.body.parentfoldername);
                if (parentfolder)
                    newFolder.parentfolderid = parentfolder.id;
            }
            const createdFolder = await FolderService.add(newFolder);
            util.setSuccess(201, 'Folder created!', createdFolder);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

export default FolderController;