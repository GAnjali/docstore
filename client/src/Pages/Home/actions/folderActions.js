import * as types from "./actionTypes";
import { SUCCESS } from "../../../AppConstants";
import { getFolders } from "../services/FolderService";

import ResponseUtil from "../../../Util/ResponseUtil";
const responseUtil = new ResponseUtil();

const getFoldersFromAPI = async parentFolderId => {
  const getFoldersResponse = responseUtil.getResponse(
    await getFolders(parentFolderId)
  );
  if (getFoldersResponse.status === SUCCESS) {
    return getFoldersResponse.data;
  } else {
    return getFoldersResponse.message;
  }
};

export function fetchFolders(parentFolderId) {
  return dispatch => {
    getFoldersFromAPI(parentFolderId).then(response =>
      dispatch(receiveFolders(response))
    );
  };
}

export function receiveFolders(folders) {
  return { type: types.RECEIVE_FOLDERS, folders: folders };
}