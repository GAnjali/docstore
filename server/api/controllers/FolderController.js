import ResponseUtil from "../utils/ResponseUtil";
import FolderService from "../services/FolderService";

const util = new ResponseUtil();

class FolderController {

    static async create(req, res) {
        const newFolder = {
            name: req.body.name,
            parentfolderid: null,
            userid: req.user.id
        };
        try {
            if (req.body.parentfoldername !== undefined) {
                const parentfolder = await FolderService.getAFolderByName(req.body.parentfoldername);
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

    static async getAll(req, res) {
        try {
            const allFolders = await FolderService.getAllFolders(req.user.id);
            if (allFolders.length > 0) {
                util.setSuccess(200, 'Folders retrieved', allFolders);
            } else {
                util.setSuccess(200, 'No folder found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async delete(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Invalid Folder ID, Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const folderToDelete = await FolderService.deleteFolder(id);
            if (folderToDelete) {
                util.setSuccess(200, 'Folder deleted');
            } else {
                util.setError(404, `Folder with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default FolderController;