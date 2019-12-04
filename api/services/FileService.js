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

    static async addFile(file) {
        try {
            const {rows} = await db.query(queries.INSERT_A_FILE, file);
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
}

export default FileService;