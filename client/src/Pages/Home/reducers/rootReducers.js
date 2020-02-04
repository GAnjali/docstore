import { combineReducers } from "redux";
import folders from "./folderReducer";
import files from "./fileReducer";
import sharedFiles from "./sharedFilesReducer";

const rootReducer = combineReducers({
  folders,
  files,
  sharedFiles
});

export default rootReducer;