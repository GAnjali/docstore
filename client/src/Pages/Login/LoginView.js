import React from "react";

const LoginView = (props) => {
    return (
        <div className="center">
            <div className="card">
                <h1>Login</h1>
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
                        value="SUBMIT"
                        type="submit"
                        onClick={props.handleFormSubmit}
                    />
                </form>
            </div>
        </div>
    )
};

export default LoginView;