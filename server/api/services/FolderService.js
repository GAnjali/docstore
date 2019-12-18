import database from "../../db/models/index"
import * as Op from "sequelize";

class FolderService {

    static async add(newFolder) {
        try {
            return await database.folder.create(newFolder);
        } catch (error) {
            throw error;
        }
    }

    static async getOneByName(foldername) {
        try {
            const theFolder = await database.folder.findOne({
                where: {name: foldername}
            });
            return theFolder;
        } catch (error) {
            throw error;
        }
    }

    static async getAllByParent(userid, parentfolderid) {
        try {
            return await database.folder.findAll({
                where: {userid: userid, parentfolderid: parentfolderid != 0 ? parentfolderid : null}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAll(userid) {
        try {
            return await database.folder.findAll({
                where: {userid: userid}
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const fileToDelete = await database.folder.findOne({where: {id: Number(id)}});

            if (fileToDelete) {
                const deletedFile = await database.folder.destroy({
                    where: {id: Number(id)}
                });
                return deletedFile;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default FolderService;