import React from "react";
import "../styles/Home.css";
import { DOCSTORE, LOGIN_URL, LOGOUT } from "../../../AppConstants";
import { removeToken, removeUser } from "../../../Util/localStorageUtil";

const Header = props => {
  const logout = () => {
    removeToken();
    removeUser();
    props.history.replace(LOGIN_URL);
  };

  return (
    <nav className="navbar">
      <h2>{DOCSTORE}</h2>
      <button className={"logout"} onClick={logout}>
        {LOGOUT}
      </button>
    </nav>
  );
};

export default Header;