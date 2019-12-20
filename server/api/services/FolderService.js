import database from "../../db/models/index";

class FolderService {
    static async add(newFolder) {
        try {
            return await database.folder.create(newFolder);
        } catch (error) {
            throw error;
        }
    }

    static async getByName(folderName) {
        try {
            return await database.folder.findOne({
                where: {name: folderName}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllByParent(userId, parentFolderId) {
        try {
            return await database.folder.findAll({
                where: {userid: userId, parentfolderid: parentFolderId !== 0 ? parentFolderId : null}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAll(userId) {
        try {
            return await database.folder.findAll({
                where: {userid: userId}
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(folderId) {
        try {
            const fileToDelete = await database.folder.findOne({where: {id: Number(folderId)}});
            if (!fileToDelete) return null;
            return await database.folder.destroy({
                where: {id: Number(folderId)}
            });
        } catch (error) {
            throw error;
        }
    }
}

export default FolderService;