import React from "react";
import {Link} from "react-router-dom";

const LoginView = (props) => {
    return (
        <div className="center">
            <div className="card">
                <h1>Docstore</h1>
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
                        value="LOGIN"
                        type="submit"
                        onClick={props.handleFormSubmit}
                    />
                </form>
                <div className={"signupLink"}>Need an account? <Link onClick={()=>{props.history.push('/signup')}}>Signup</Link></div>
            </div>
        </div>
    )
};

export default LoginView;