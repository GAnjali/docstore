import database from "../../db/models/index"

class ShareService {

    static async add(sharingItem) {
        try {
            return await database.share.create(sharingItem);
        } catch (error) {
            throw error;
        }
    }

    static async getAllByUser(userId) {
        try {
            return await database.share.findAll({
                where: {userid: userId}
            });
        } catch (error) {
            throw error;
        }
    }

    static async update(sharingItem) {
        try {
            await database.share.update({sharetype: sharingItem.sharetype}, {
                where: {
                    fileid: sharingItem.fileid,
                    userid: sharingItem.userid
                }
            });
            return sharingItem;
        } catch (error) {
            throw error;
        }
    }
}

export default ShareService;