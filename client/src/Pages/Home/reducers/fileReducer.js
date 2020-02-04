import initialState from "./initialState";
import { FETCH_FILES, RECEIVE_FILES } from "../actions/actionTypes";

export default function files(state = initialState.files, action) {
  let newState;
  switch (action.type) {
    case FETCH_FILES:
      return action;
    case RECEIVE_FILES:
      newState = action.files;
      return newState;
    default:
      return state;
  }
}