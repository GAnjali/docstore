import React from "react";
import '../styles/Home.css';

const Header = (props) => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        props.history.replace('/login');
    };

    return (
        <nav className="navbar">
            <h2>Docstore</h2>
            <button className={"logout"} onClick={logout}>Logout</button>
        </nav>
    );
};

export default Header;