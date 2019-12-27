import FileService from "../services/FileService";
import ResponseUtil from "../utils/ResponseUtil";
import FolderService from "../services/FolderService";

const responseUtil = new ResponseUtil();

class FileController {
  static async getAll(req, res) {
    try {
      const allFiles = await FileService.getAll(req.user.id);
      if (allFiles.length > 0) {
        responseUtil.setSuccess(200, "Files retrieved", allFiles);
      } else {
        responseUtil.setSuccess(404, "No file found");
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async getAllByParent(req, res) {
    try {
      let { parentFolderId } = req.params;
      const allFiles = await FileService.getAllByParent(
        req.user.id,
        parentFolderId
      );
      if (allFiles.length > 0) {
        responseUtil.setSuccess(200, "Files retrieved", allFiles);
      } else {
        responseUtil.setSuccess(404, "No files found");
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async add(req, res) {
    const newFile = {
      name: req.body.name,
      content: req.body.content,
      parentfolderid: null,
      userid: req.user.id
    };
    try {
      if (req.body.parentfoldername !== undefined) {
        const parentFolder = await FolderService.getByName(
          req.body.parentfoldername
        );
        if (parentFolder) newFile.parentfolderid = parentFolder.id;
      }
      const createdFile = await FileService.add(newFile);
      responseUtil.setSuccess(201, "File Added!", createdFile);
      return responseUtil.send(res);
    } catch (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      )
        responseUtil.setError(
          400,
          "Cannot create a File with Duplicate name, Please provide unique file name"
        );
      else responseUtil.setError(400, error.message);
      return responseUtil.send(res);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      responseUtil.setError(400, "Please input a valid numeric value");
      return responseUtil.send(res);
    }
    try {
      const retrievedFile = await FileService.getOne(id);

      if (!retrievedFile) {
        responseUtil.setError(404, `Cannot find file with the id ${id}`);
      } else {
        responseUtil.setSuccess(200, "Found File!", retrievedFile);
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async update(req, res) {
    const updateData = req.body;
    const { id } = req.params;

    if (!Number(id)) {
      responseUtil.setError(400, "Please input a valid numeric value");
      return responseUtil.send(res);
    }
    try {
      const updateFile = await FileService.update(id, updateData);
      if (!updateFile) {
        responseUtil.setError(404, `Cannot find file with the id: ${id}`);
      } else {
        responseUtil.setSuccess(200, "File updated", updateFile);
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      responseUtil.setError(400, "Please input a valid numeric value");
      return responseUtil.send(res);
    }
    try {
      const fileToDelete = await FileService.delete(id);
      if (fileToDelete) {
        responseUtil.setSuccess(200, "File deleted");
      } else {
        responseUtil.setError(404, `File with the id ${id} cannot be found`);
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }
}

export default FileController;