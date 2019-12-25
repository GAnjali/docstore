import ShareService from "./ShareService";
import FileService from "./FileService";

class SharedFilesService {
  static async getSharedFiles(userId) {
    try {
      const shares = await ShareService.getAllByUser(userId);
      return Promise.all(
        shares.map(async share => {
          const file = await FileService.getOne(share.fileid);
          return file.dataValues;
        })
      ).then(result => {
        return result;
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SharedFilesService;