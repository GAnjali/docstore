import initialState from "./initialState";
import {
  FETCH_SHARED_FILES,
  RECEIVE_SHARED_FILES
} from "../actions/actionTypes";

export default function sharedFiles(state = initialState.sharedFiles, action) {
  let newState;
  switch (action.type) {
    case FETCH_SHARED_FILES:
      return action;
    case RECEIVE_SHARED_FILES:
      newState = action.sharedFiles;
      return newState;
    default:
      return state;
  }
}