import db from '../../db';

const queries = require('../../db/queries');

class FileService {
    static async getAllFiles() {
        try {
            const {rows} = await db.query(queries.GET_ALL_FILES);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAFile(id) {
        try {
            const {rows} = await db.query(queries.GET_A_FILE, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async addFile(file) {
        try {
            const {rows} = await db.query(queries.INSERT_A_FILE, file);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateFile) {
        try {
            const {rows} = await db.query(queries.GET_A_FILE, [id]);
            if (rows[0]) {
                const updatingFile = [updateFile.name || rows[0].name,
                    updateFile.content || rows[0].content, id];
                await db.query(queries.UPDATE_A_FILE, updatingFile);
                return updatingFile;
            }
            return null;
        } catch (err) {
            return err;
        }
    }

    static async deleteFile(id) {
        try {
            const fileToDelete = await db.query(queries.GET_A_FILE, [id]);

            if (fileToDelete) {
                const deletedFile = await db.query(queries.DELETE_A_FILE, [id]);
                return deletedFile;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default FileService;