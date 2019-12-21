import database from "../../db/models";

class SharedFilesService {
    static async getSharedFiles(userId) {
        try {
            const sharedFiles = [];
            await database.share.findAll({
                where: {userid: userId},
                include: database.file
            })
                .then((shares) => {
                    const resObj = shares.map(share => {
                        return Object.assign(
                            {},
                            {
                                share_id: share.id,
                                file_id: share.fileid,
                                share_type: share.sharetype,
                                user_id: share.userid,
                                sharedFile: Object.assign(
                                    {},
                                    {
                                        id: share.file.id,
                                        userid: share.file.userid,
                                        name: share.file.name,
                                        content: share.file.content,
                                        parentfolderid: share.file.parentfolderid
                                    }
                                )
                            })
                    });
                    resObj.map(share => {
                        sharedFiles.push(share.sharedFile)
                    });
                })
            return sharedFiles;
        } catch (error) {
            throw error;
        }
    }
}

export default SharedFilesService;