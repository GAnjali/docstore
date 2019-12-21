import React from "react";
import { Link } from "react-router-dom";
import {
  DOCSTORE,
  EMAIL_PLACEHOLDER,
  LOGIN,
  NEED_AN_ACCOUNT,
  PASSWORD_PLACEHOLDER,
  SIGNUP_URL
} from "../../AppConstants";

const LoginView = props => {
  return (
    <div className="center">
      <div className="card">
        <h1>{DOCSTORE}</h1>
        <form>
          <input
            className="form-item"
            placeholder={EMAIL_PLACEHOLDER}
            name="email"
            type="text"
            onChange={props.handleInputChange}
          />
          <input
            className="form-item"
            placeholder={PASSWORD_PLACEHOLDER}
            name="password"
            type="password"
            onChange={props.handleInputChange}
          />
          {props.hasError && <h6 className={"error"}>{props.error}</h6>}
          <input
            className="form-submit"
            value={LOGIN}
            type="submit"
            onClick={props.handleLogin}
          />
        </form>
        <div className={"signupLink"}>
          {NEED_AN_ACCOUNT}
          <Link
            onClick={() => {
              props.history.push(SIGNUP_URL);
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;