import { DOCSTORE, LOGOUT } from "../../../AppConstants";
import React from "react";

const HeaderComponent = props => {
  return (
    <nav className="navbar">
      <h2>{DOCSTORE}</h2>
      <button className={"logout"} onClick={props.logout}>
        {LOGOUT}
      </button>
    </nav>
  );
};

export default HeaderComponent;