import database from "../../db/models/index"

class FolderService {

    static async add(newFolder) {
        try {
            return await database.folder.create(newFolder);
        } catch (error) {
            throw error;
        }
    }

}

export default FolderService;