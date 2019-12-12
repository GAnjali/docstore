import React from "react";

const SignupView = (props) => {
    return (
        <div className="center">
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
                    <input
                        className="form-item"
                        placeholder="Enter password again..."
                        name="password"
                        type="password"
                        onChange={props.handleChange}
                    />
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