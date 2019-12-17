import database from "../../db/models/index"

class FileService {
    static async getAll(userid) {
        try {
            return await database.file.findAll({
                where: {userid: userid}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllByParent(userid, parentfolderid) {
        try {
            return await database.file.findAll({
                where: {userid: userid, parentfolderid: parentfolderid !== 0 ? parentfolderid : null}
            });
        } catch (error) {
            throw error;
        }
    }

    static async add(newFile) {
        try {
            return await database.file.create(newFile);
        } catch (error) {
            throw error;
        }
    }

    static async getOne(id) {
        try {
            const theFile = await database.file.findOne({
                where: {id: Number(id)}
            });
            return theFile;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateFile) {
        try {
            const fileToUpdate = await database.file.findOne({
                where: {id: Number(id)}
            });

            if (fileToUpdate) {
                if (fileToUpdate.name === updateFile.name) //to avoid Unique constraint violation for file name
                    await database.file.update({content: updateFile.content}, {where: {id: Number(id)}});
                else
                    await database.file.update({
                        name: updateFile.name,
                        content: updateFile.content
                    }, {where: {id: Number(id)}});
                return updateFile;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const fileToDelete = await database.file.findOne({where: {id: Number(id)}});
            if (fileToDelete) {
                const deletedFile = await database.file.destroy({
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

export default FileService;