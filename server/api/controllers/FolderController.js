import ResponseUtil from "../utils/ResponseUtil";
import FolderService from "../services/FolderService";

const responseUtil = new ResponseUtil();

class FolderController {
    static async create(req, res) {
        const newFolder = {
            name: req.body.name,
            parentfolderid: null,
            userid: req.user.id
        };
        try {
            if (req.body.parentfoldername !== undefined) {
                const parentFolder = await FolderService.getByName(req.body.parentfoldername);
                if (parentFolder)
                    newFolder.parentfolderid = parentFolder.id;
            }
            const createdFolder = await FolderService.add(newFolder);
            responseUtil.setSuccess(201, 'Folder created!', createdFolder);
            return responseUtil.send(res);
        } catch (error) {
            responseUtil.setError(400, error.message);
            return responseUtil.send(res);
        }
    }

    static async getAll(req, res) {
        try {
            const allFolders = await FolderService.getAll(req.user.id);
            if (allFolders.length > 0) {
                responseUtil.setSuccess(200, 'Folders retrieved', allFolders);
            } else {
                responseUtil.setSuccess(200, 'No folder found');
            }
            return responseUtil.send(res);
        } catch (error) {
            responseUtil.setError(400, error);
            return responseUtil.send(res);
        }
    }

    static async getAllByParent(req, res) {
        try {
            let {parentFolderId} = req.params;
            const allFolders = await FolderService.getAllByParent(req.user.id, parentFolderId);
            if (allFolders.length > 0) {
                responseUtil.setSuccess(200, 'Folders retrieved', allFolders);
            } else {
                responseUtil.setSuccess(200, 'No folder found');
            }
            return responseUtil.send(res);
        } catch (error) {
            responseUtil.setError(400, error);
            return responseUtil.send(res);
        }
    }

    static async delete(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            responseUtil.setError(400, 'Invalid Folder ID, Please input a valid numeric value');
            return responseUtil.send(res);
        }
        try {
            const folderToDelete = await FolderService.delete(id);
            if (folderToDelete) {
                responseUtil.setSuccess(200, 'Folder deleted');
            } else {
                responseUtil.setError(404, `Folder with the id ${id} cannot be found`);
            }
            return responseUtil.send(res);
        } catch (error) {
            responseUtil.setError(400, error);
            return responseUtil.send(res);
        }
    }
}

export default FolderController;