import database from "../../db/models/index"

class ShareService {

    static async add(sharingitem) {
        try {
            return await database.share.create(sharingitem);
        } catch (error) {
            throw error;
        }
    }

    static async getAllByUser(userid) {
        try {
            return await database.share.findAll({
                where: {userid: userid}
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllByFileUser(file, user) {
        try {
            return await database.share.findAll({
                where: {fileid: file, userid: user}
            });
        } catch (error) {
            throw error;
        }
    }

    static async update(sharing) {
        try {
            await database.share.update({sharetype: sharing.sharetype}, {
                where: {
                    fileid: sharing.fileid,
                    userid: sharing.userid
                }
            });
            return sharing;
        } catch (error) {
            throw error;
        }
    }
}

export default ShareService;