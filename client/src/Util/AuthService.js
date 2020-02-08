import { getToken } from "./localStorageUtil";
import decode from "jwt-decode";

export const isLoggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};