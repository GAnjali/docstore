import React from "react";

function Signup() {
    return (
        <div className="center">
            <div className="card">
                <h1>Sign up</h1>
                <form>
                    <input
                        className="form-item"
                        placeholder="Username goes here..."
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here..."
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-submit"
                        value="REGISTER"
                        type="submit"
                        onClick={this.handleFormSubmit}
                    />
                </form>
            </div>
        </div>
    );


}

export default Signup;
