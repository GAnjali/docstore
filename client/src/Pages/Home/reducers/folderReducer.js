import initialState from "./initialState";
import { FETCH_FOLDERS, RECEIVE_FOLDERS } from "../actions/actionTypes";

export default function folders(state = initialState.folders, action) {
  let newState;
  switch (action.type) {
    case FETCH_FOLDERS:
      return action;
    case RECEIVE_FOLDERS:
      newState = action.folders;
      return newState;
    default:
      return state;
  }
}