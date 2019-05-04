import React from "react";
import "./style.css";

function NavBar() {
    return <div>
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand">Yum(me).v.3</a>
            <a className="navbar-brand" href="/login">Login</a>
            <a className="navbar-brand" href="/landing">Landing</a>
        </nav>
    </div>
}

export default NavBar;