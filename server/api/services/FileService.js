import database from "../../db/models/index"

class FileService {
    static async getAll(userId) {
        try {
            return await database.file.findAll({
                where: {userid: userId}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllByParent(userId, parentFolderId) {
        try {
            return await database.file.findAll({
                where: {userid: userId, parentfolderid: parentFolderId != 0 ? parentFolderId : null}
            });
        } catch (error) {
            throw error;
        }
    }

    static async add(file) {
        try {
            return await database.file.create(file);
        } catch (error) {
            throw error;
        }
    }

    static async getOne(id) {
        try {
            return await database.file.findOne({
                where: {id: Number(id)}
            });
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateFile) {
        try {
            const fileToUpdate = await database.file.findOne({
                where: {id: Number(id)}
            });
            if (!fileToUpdate) return null;
            if (fileToUpdate.name === updateFile.name)
                await database.file.update({content: updateFile.content}, {where: {id: Number(id)}});
            else
                await database.file.update({
                    name: updateFile.name,
                    content: updateFile.content
                }, {where: {id: Number(id)}});
            return updateFile;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const fileToDelete = await database.file.findOne({where: {id: Number(id)}});
            if (!fileToDelete) return null;
            return await database.file.destroy({
                where: {id: Number(id)}
            });
        } catch (error) {
            throw error;
        }
    }
}

export default FileService;