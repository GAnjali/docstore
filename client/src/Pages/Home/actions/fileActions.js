import * as types from "./actionTypes";
import { SUCCESS } from "../../../AppConstants";
import { getFiles, getSharedFiles } from "../services/FileService";

import ResponseUtil from "../../../Util/ResponseUtil";
import { getUserByEmail } from "../services/HomeService";
import { getUser } from "../../../Util/localStorageUtil";
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

const getUserId = async () => {
  const getUserResponse = responseUtil.getResponse(
    await getUserByEmail(getUser())
  );
  if (getUserResponse.status === SUCCESS) {
    return getUserResponse.data.id;
  }
  // else {
  //     return getUserResponse.message
  // }
};

const getSharedFilesFromAPI = async parentFolderId => {
  const getSHaredFilesResponse = responseUtil.getResponse(
    await getSharedFiles(await getUserId())
  );
  if (getSHaredFilesResponse.status === SUCCESS) {
    return getSHaredFilesResponse.data;
  } else {
    return getSHaredFilesResponse.message;
  }
};

const updateFiles = (files, sharedFiles) => {
  sharedFiles.map(file => {
    files.push(file);
  });
  return files;
};

export function fetchFiles(parentFolderId) {
  let files = {};
  return dispatch => {
    getFilesFromAPI(parentFolderId).then(response => {
      files = response;
      dispatch(receiveFiles(response));
    });
    getSharedFilesFromAPI(parentFolderId).then(response => {
      dispatch(receiveSharedFiles(response));
      dispatch(receiveFiles(updateFiles(files, response)));
    });
  };
}

export function receiveFiles(response) {
  return { type: types.RECEIVE_FILES, files: response };
}

export function receiveSharedFiles(response) {
  return { type: types.RECEIVE_SHARED_FILES, sharedFiles: response };
}