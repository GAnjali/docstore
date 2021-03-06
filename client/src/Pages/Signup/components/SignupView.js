import React from "react";
import {
  DOCSTORE,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  SIGNUP
} from "../../../AppConstants";

const SignupView = props => {
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
            onChange={props.handleChange}
          />
          <input
            className="form-item"
            placeholder={PASSWORD_PLACEHOLDER}
            name="password"
            type="password"
            onChange={props.handleChange}
          />
          {props.hasError && <h6 className={"error"}>{props.error}</h6>}
          <input
            className="form-submit"
            value={SIGNUP}
            type="submit"
            onClick={props.handleFormSignup}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupView;
