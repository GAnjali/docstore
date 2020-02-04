import { combineReducers } from "redux";
import folders from "./folderReducer";
import files from "./fileReducer";

const rootReducer = combineReducers({
  folders,
  files
});

export default rootReducer;