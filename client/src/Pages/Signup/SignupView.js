import React from "react";
import Header from "../Home/Header";

const SignupView = (props) => {
    return (
        <div className="center">
            <Header/>
            <div className="card">
                <h1>Signup</h1>
                <form>
                    <input
                        className="form-item"
                        placeholder="Username goes here..."
                        name="username"
                        type="text"
                        onChange={props.handleChange}
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here..."
                        name="password"
                        type="password"
                        onChange={props.handleChange}
                    />
                    {props.hasError && <h4>{props.error}</h4>}
                    <input
                        className="form-submit"
                        value="Register"
                        type="submit"
                        onClick={props.handleFormSubmit}
                    />
                </form>
            </div>
        </div>
    )
};

export default SignupView;