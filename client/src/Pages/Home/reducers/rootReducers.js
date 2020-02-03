import { combineReducers } from "redux";
import folders from "./folderReducer";

const rootReducer = combineReducers({
  folders
});

export default rootReducer;