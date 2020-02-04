import * as types from "./actionTypes";
import { SUCCESS } from "../../../AppConstants";
import { getFiles } from "../services/FileService";

import ResponseUtil from "../../../Util/ResponseUtil";
const responseUtil = new ResponseUtil();

const getFilesFromAPI = async parentFolderId => {
  const getFilesResponse = responseUtil.getResponse(
    await getFiles(parentFolderId)
  );
  if (getFilesResponse.status === SUCCESS) {
    return getFilesResponse.data;
  } else {
    return getFilesResponse.message;
  }
};

export function fetchFiles(parentFolderId) {
  let files = {};
  return dispatch => {
    getFilesFromAPI(parentFolderId).then(response => {
      files = response;
      dispatch(receiveFiles(response));
    });
  };
}

export function receiveFiles(response) {
  return { type: types.RECEIVE_FILES, files: response };
}